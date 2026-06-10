import logging

from aiogram import Bot
from aiogram.exceptions import TelegramBadRequest, TelegramForbiddenError
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from app.config import settings
from app.database import session_factory
from app.keyboards.planner import done_keyboard
from app.services.planner import PlannerService
from app.services.presentation import active_task_text


logger = logging.getLogger(__name__)


class CountdownService:
    def __init__(self, bot: Bot):
        self.bot = bot
        self.scheduler = AsyncIOScheduler(timezone=settings.timezone)

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

