from dataclasses import dataclass
from datetime import date, datetime, time

from sqlalchemy import delete, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner import Task, TaskLog
from app.utils.datetime import local_now


class TaskNotFoundError(Exception):
    pass


class TaskAlreadyDoneError(Exception):
    pass


class ActiveTaskExistsError(Exception):
    pass


@dataclass
class TaskWithLog:
    task: Task
    log: TaskLog


class PlannerService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_task(
        self,
        telegram_user_id: int,
        title: str,
        task_date: date,
        start_time: time,
        end_time: time,
        repeat_daily: bool,
    ) -> Task:
        task = Task(
            telegram_user_id=telegram_user_id,
            title=title,
            date=task_date,
            start_time=start_time,
            end_time=end_time,
            repeat_daily=repeat_daily,
            status="planned",
        )
        self.session.add(task)
        await self.session.commit()
        await self.session.refresh(task)
        return task

    async def list_for_date(
        self,
        telegram_user_id: int,
        target_date: date,
    ) -> list[TaskWithLog]:
        statement = (
            select(Task)
            .where(
                Task.telegram_user_id == telegram_user_id,
                or_(Task.date == target_date, Task.repeat_daily.is_(True)),
            )
            .order_by(Task.start_time.asc(), Task.id.asc())
        )
        tasks = list((await self.session.scalars(statement)).all())
        result = []
        changed = False

        for task in tasks:
            log = await self._get_log(task.id, target_date)
            if log is None:
                log = TaskLog(task_id=task.id, date=target_date)
                self.session.add(log)
                await self.session.flush()
                changed = True
            result.append(TaskWithLog(task=task, log=log))

        if changed:
            await self.session.commit()
        return result

    async def start_task(
        self,
        task_id: int,
        telegram_user_id: int,
        target_date: date,
    ) -> TaskWithLog:
        task = await self._get_task(task_id, telegram_user_id)
        if task is None:
            raise TaskNotFoundError

        log = await self._get_or_create_log(task.id, target_date)
        if log.status == "done":
            raise TaskAlreadyDoneError

        active_statement = (
            select(TaskLog)
            .join(Task)
            .where(
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status == "active",
                TaskLog.id != log.id,
            )
            .limit(1)
        )
        if await self.session.scalar(active_statement):
            raise ActiveTaskExistsError

        now = local_now()
        log.status = "active"
        log.started_at = log.started_at or now
        log.finished_at = None

        if not task.repeat_daily:
            task.status = "active"
            task.started_at = log.started_at
            task.finished_at = None

        await self.session.commit()
        return TaskWithLog(task=task, log=log)

    async def save_message(
        self,
        task_id: int,
        target_date: date,
        chat_id: int,
        message_id: int,
    ) -> None:
        log = await self._get_or_create_log(task_id, target_date)
        task = await self.session.get(Task, task_id)
        log.telegram_chat_id = chat_id
        log.telegram_message_id = message_id
        if task is not None and not task.repeat_daily:
            task.telegram_chat_id = chat_id
            task.telegram_message_id = message_id
        await self.session.commit()

    async def get_active(
        self,
        telegram_user_id: int,
    ) -> TaskWithLog | None:
        statement = (
            select(Task, TaskLog)
            .join(TaskLog, TaskLog.task_id == Task.id)
            .where(
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status == "active",
            )
            .order_by(TaskLog.started_at.desc())
            .limit(1)
        )
        row = (await self.session.execute(statement)).first()
        if row is None:
            return None
        return TaskWithLog(task=row[0], log=row[1])

    async def get_active_by_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> TaskWithLog:
        statement = (
            select(Task, TaskLog)
            .join(TaskLog, TaskLog.task_id == Task.id)
            .where(
                Task.id == task_id,
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status == "active",
            )
            .order_by(TaskLog.started_at.desc())
            .limit(1)
        )
        row = (await self.session.execute(statement)).first()
        if row is not None:
            return TaskWithLog(task=row[0], log=row[1])

        task = await self._get_task(task_id, telegram_user_id)
        if task is None:
            raise TaskNotFoundError

        done_statement = (
            select(TaskLog)
            .where(TaskLog.task_id == task_id, TaskLog.status == "done")
            .order_by(TaskLog.finished_at.desc())
            .limit(1)
        )
        if await self.session.scalar(done_statement):
            raise TaskAlreadyDoneError
        raise TaskNotFoundError

    async def finish_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> TaskWithLog:
        item = await self.get_active_by_task(task_id, telegram_user_id)
        now = local_now()
        item.log.status = "done"
        item.log.finished_at = now

        if not item.task.repeat_daily:
            item.task.status = "done"
            item.task.finished_at = now

        await self.session.commit()
        return item

    async def delete_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> bool:
        task = await self._get_task(task_id, telegram_user_id)
        if task is None:
            return False
        await self.session.execute(delete(Task).where(Task.id == task.id))
        await self.session.commit()
        return True

    async def active_logs(self) -> list[TaskWithLog]:
        statement = (
            select(Task, TaskLog)
            .join(TaskLog, TaskLog.task_id == Task.id)
            .where(TaskLog.status == "active")
        )
        rows = (await self.session.execute(statement)).all()
        return [TaskWithLog(task=row[0], log=row[1]) for row in rows]

    async def _get_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> Task | None:
        return await self.session.scalar(
            select(Task).where(
                Task.id == task_id,
                Task.telegram_user_id == telegram_user_id,
            )
        )

    async def _get_log(
        self,
        task_id: int,
        target_date: date,
    ) -> TaskLog | None:
        return await self.session.scalar(
            select(TaskLog).where(
                TaskLog.task_id == task_id,
                TaskLog.date == target_date,
            )
        )

    async def _get_or_create_log(
        self,
        task_id: int,
        target_date: date,
    ) -> TaskLog:
        log = await self._get_log(task_id, target_date)
        if log is None:
            log = TaskLog(task_id=task_id, date=target_date)
            self.session.add(log)
            await self.session.flush()
        return log

