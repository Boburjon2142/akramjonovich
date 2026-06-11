import logging
from datetime import date, datetime

from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest, TelegramForbiddenError
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

from app.config import settings
from app.database import session_factory
from app.keyboards.planner import done_keyboard, reminder_keyboard
from app.models.planner import Task
from app.services.planner import PlannerService
from app.services.presentation import active_task_text
from app.utils.datetime import local_now


logger = logging.getLogger(__name__)


class CountdownService:
    def __init__(self, bot: Bot):
        self.bot = bot
        self.scheduler = AsyncIOScheduler(timezone=settings.timezone)
        self.timezone = pytz.timezone(settings.timezone)

    async def start(self) -> None:
        self.scheduler.start()

    async def shutdown(self) -> None:
        if self.scheduler.running:
            self.scheduler.shutdown(wait=False)

    async def restore_active_tasks(self) -> None:
        async with session_factory() as session:
            items = await PlannerService(session).active_logs()
        for item in items:
            if item.log.telegram_chat_id and item.log.telegram_message_id:
                self.schedule(item.log.id)

    async def restore_task_notifications(self) -> None:
        today = local_now().date()
        async with session_factory() as session:
            tasks = await PlannerService(session).notification_tasks(today)
        for task in tasks:
            await self.schedule_task_notification(task)

    async def schedule_task_notification(self, task: Task) -> None:
        now = datetime.now(self.timezone)
        start_at = self.timezone.localize(
            datetime.combine(task.date, task.start_time)
        )

        if task.repeat_daily:
            self.scheduler.add_job(
                self.send_task_notification,
                "cron",
                hour=task.start_time.hour,
                minute=task.start_time.minute,
                start_date=start_at,
                args=[task.id],
                id=self._reminder_job_id(task.id),
                replace_existing=True,
                max_instances=1,
                coalesce=True,
            )

            today_start = self.timezone.localize(
                datetime.combine(now.date(), task.start_time)
            )
            today_end = self.timezone.localize(
                datetime.combine(now.date(), task.end_time)
            )
            if task.date <= now.date() and today_start <= now < today_end:
                await self.send_task_notification(task.id, now.date())
            return

        if start_at > now:
            self.scheduler.add_job(
                self.send_task_notification,
                "date",
                run_date=start_at,
                args=[task.id, task.date],
                id=self._reminder_job_id(task.id),
                replace_existing=True,
            )
            return

        end_at = self.timezone.localize(
            datetime.combine(task.date, task.end_time)
        )
        if start_at <= now < end_at:
            await self.send_task_notification(task.id, task.date)

    def stop_task_notification(self, task_id: int) -> None:
        job = self.scheduler.get_job(self._reminder_job_id(task_id))
        if job:
            job.remove()

    async def send_task_notification(
        self,
        task_id: int,
        target_date: date | None = None,
    ) -> None:
        notification_date = target_date or local_now().date()
        async with session_factory() as session:
            service = PlannerService(session)
            item = await service.prepare_notification(
                task_id,
                notification_date,
            )

        if item is None:
            return

        chat_id = item.task.telegram_chat_id or item.task.telegram_user_id
        text = (
            "Vazifa vaqti keldi!\n\n"
            f"Vazifa: {item.task.title}\n"
            f"Vaqt: {item.task.start_time.strftime('%H:%M')}-"
            f"{item.task.end_time.strftime('%H:%M')}"
        )
        try:
            await self.bot.send_message(
                chat_id=chat_id,
                text=text,
                reply_markup=reminder_keyboard(item.task.id),
            )
        except (TelegramBadRequest, TelegramForbiddenError) as error:
            logger.warning(
                "Vazifa eslatmasi yuborilmadi, task_id=%s: %s",
                task_id,
                error,
            )
            return

        async with session_factory() as session:
            await PlannerService(session).mark_notification_sent(
                item.log.id,
                local_now(),
            )

    def schedule(self, log_id: int) -> None:
        self.scheduler.add_job(
            self.update_message,
            "interval",
            minutes=1,
            args=[log_id],
            id=self._job_id(log_id),
            replace_existing=True,
            max_instances=1,
            coalesce=True,
        )

    def stop(self, log_id: int) -> None:
        job = self.scheduler.get_job(self._job_id(log_id))
        if job:
            job.remove()

    async def update_message(self, log_id: int) -> None:
        from sqlalchemy import select

        from app.models.planner import Task, TaskLog

        async with session_factory() as session:
            statement = (
                select(Task, TaskLog)
                .join(TaskLog, TaskLog.task_id == Task.id)
                .where(TaskLog.id == log_id, TaskLog.status == "active")
            )
            row = (await session.execute(statement)).first()

        if row is None:
            self.stop(log_id)
            return

        task, log = row
        if not log.telegram_chat_id or not log.telegram_message_id:
            self.stop(log_id)
            return

        text, expired = active_task_text(task, log)
        try:
            await self.bot.edit_message_text(
                chat_id=log.telegram_chat_id,
                message_id=log.telegram_message_id,
                text=text,
                reply_markup=done_keyboard(task.id, expired),
            )
        except TelegramBadRequest as error:
            if "message is not modified" not in str(error).lower():
                logger.warning("Countdown xabari yangilanmadi: %s", error)
        except TelegramForbiddenError:
            self.stop(log_id)

        if expired:
            self.stop(log_id)

    @staticmethod
    def _job_id(log_id: int) -> str:
        return f"planner_countdown:{log_id}"

    @staticmethod
    def _reminder_job_id(task_id: int) -> str:
        return f"planner_reminder:{task_id}"

