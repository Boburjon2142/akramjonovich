from dataclasses import dataclass
from datetime import date, datetime, time, timedelta

from sqlalchemy import and_, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.planner import Task, TaskLog, TaskSession
from app.utils.datetime import local_now


class TaskNotFoundError(Exception):
    pass


class TaskAlreadyDoneError(Exception):
    pass


class ActiveTaskExistsError(Exception):
    pass


class TaskNotPausedError(Exception):
    pass


@dataclass
class TaskWithLog:
    task: Task
    log: TaskLog


@dataclass
class ReportEntry:
    title: str
    total_seconds: int
    completed_count: int


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
        telegram_chat_id: int | None = None,
    ) -> Task:
        task = Task(
            telegram_user_id=telegram_user_id,
            title=title,
            date=task_date,
            start_time=start_time,
            end_time=end_time,
            repeat_daily=repeat_daily,
            status="planned",
            telegram_chat_id=telegram_chat_id,
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
                Task.archived_at.is_(None),
                or_(
                    Task.date == target_date,
                    and_(
                        Task.repeat_daily.is_(True),
                        Task.date <= target_date,
                    ),
                ),
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
        if log.status in {"active", "paused"}:
            raise ActiveTaskExistsError

        active_statement = (
            select(TaskLog)
            .join(Task)
            .where(
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status.in_(("active", "paused")),
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
        self.session.add(TaskSession(task_log_id=log.id, started_at=now))

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
                TaskLog.status.in_(("active", "paused")),
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
                TaskLog.status.in_(("active", "paused")),
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

    async def pause_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> TaskWithLog:
        item = await self._get_by_task_and_status(
            task_id,
            telegram_user_id,
            ("active",),
        )
        if item is None:
            raise TaskNotFoundError

        await self._close_open_session(item.log.id, local_now())
        item.log.status = "paused"
        if not item.task.repeat_daily:
            item.task.status = "paused"
        await self.session.commit()
        return item

    async def resume_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> TaskWithLog:
        item = await self._get_by_task_and_status(
            task_id,
            telegram_user_id,
            ("paused",),
        )
        if item is None:
            raise TaskNotPausedError

        other_statement = (
            select(TaskLog)
            .join(Task)
            .where(
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status.in_(("active", "paused")),
                TaskLog.id != item.log.id,
            )
            .limit(1)
        )
        if await self.session.scalar(other_statement):
            raise ActiveTaskExistsError

        now = local_now()
        item.log.status = "active"
        self.session.add(TaskSession(task_log_id=item.log.id, started_at=now))
        if not item.task.repeat_daily:
            item.task.status = "active"
        await self.session.commit()
        return item

    async def finish_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> TaskWithLog:
        item = await self.get_active_by_task(task_id, telegram_user_id)
        now = local_now()
        if item.log.status == "active":
            await self._close_open_session(item.log.id, now)
        item.log.status = "done"
        item.log.finished_at = now

        if not item.task.repeat_daily:
            item.task.status = "done"
            item.task.finished_at = now

        await self.session.commit()
        return item

    async def elapsed_seconds(self, log_id: int) -> int:
        statement = (
            select(
                TaskSession.started_at,
                TaskSession.ended_at,
                TaskSession.duration_seconds,
            )
            .where(TaskSession.task_log_id == log_id)
            .order_by(TaskSession.started_at.asc())
        )
        rows = (await self.session.execute(statement)).all()
        now: datetime | None = None
        total = 0
        for started_at, ended_at, duration_seconds in rows:
            if ended_at is None:
                now = now or local_now()
                total += max(0, int((now - started_at).total_seconds()))
            else:
                total += max(0, duration_seconds)
        return total

    async def daily_report(
        self,
        telegram_user_id: int,
        target_date: date,
    ) -> list[ReportEntry]:
        return await self._report(
            telegram_user_id,
            target_date,
            target_date + timedelta(days=1),
            group_same_titles=False,
        )

    async def monthly_report(
        self,
        telegram_user_id: int,
        year: int,
        month: int,
    ) -> list[ReportEntry]:
        period_start = date(year, month, 1)
        if month == 12:
            period_end = date(year + 1, 1, 1)
        else:
            period_end = date(year, month + 1, 1)
        return await self._report(
            telegram_user_id,
            period_start,
            period_end,
            group_same_titles=True,
        )

    async def delete_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> bool:
        task = await self._get_task(task_id, telegram_user_id)
        if task is None:
            return False

        now = local_now()
        in_progress = await self.session.scalars(
            select(TaskLog).where(
                TaskLog.task_id == task.id,
                TaskLog.status.in_(("active", "paused")),
            )
        )
        for log in in_progress:
            if log.status == "active":
                await self._close_open_session(log.id, now)
            log.status = "cancelled"
            log.finished_at = now

        task.archived_at = now
        task.status = "cancelled"
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

    async def notification_tasks(self, target_date: date) -> list[Task]:
        statement = (
            select(Task)
            .where(
                Task.archived_at.is_(None),
                or_(
                    Task.repeat_daily.is_(True),
                    Task.date >= target_date,
                )
            )
            .order_by(Task.date.asc(), Task.start_time.asc())
        )
        return list((await self.session.scalars(statement)).all())

    async def prepare_notification(
        self,
        task_id: int,
        target_date: date,
    ) -> TaskWithLog | None:
        task = await self.session.get(Task, task_id)
        if task is None:
            return None
        if task.archived_at is not None:
            return None
        if target_date < task.date:
            return None
        if not task.repeat_daily and target_date != task.date:
            return None

        log = await self._get_or_create_log(task.id, target_date)
        if log.status != "planned" or log.notified_at is not None:
            return None

        await self.session.commit()
        return TaskWithLog(task=task, log=log)

    async def mark_notification_sent(
        self,
        log_id: int,
        notified_at: datetime,
    ) -> None:
        log = await self.session.get(TaskLog, log_id)
        if log is None:
            return
        log.notified_at = notified_at
        await self.session.commit()

    async def _get_task(
        self,
        task_id: int,
        telegram_user_id: int,
    ) -> Task | None:
        return await self.session.scalar(
            select(Task).where(
                Task.id == task_id,
                Task.telegram_user_id == telegram_user_id,
                Task.archived_at.is_(None),
            )
        )

    async def _get_by_task_and_status(
        self,
        task_id: int,
        telegram_user_id: int,
        statuses: tuple[str, ...],
    ) -> TaskWithLog | None:
        statement = (
            select(Task, TaskLog)
            .join(TaskLog, TaskLog.task_id == Task.id)
            .where(
                Task.id == task_id,
                Task.telegram_user_id == telegram_user_id,
                TaskLog.status.in_(statuses),
            )
            .order_by(TaskLog.date.desc())
            .limit(1)
        )
        row = (await self.session.execute(statement)).first()
        if row is None:
            return None
        return TaskWithLog(task=row[0], log=row[1])

    async def _close_open_session(
        self,
        log_id: int,
        ended_at: datetime,
    ) -> None:
        session = await self.session.scalar(
            select(TaskSession)
            .where(
                TaskSession.task_log_id == log_id,
                TaskSession.ended_at.is_(None),
            )
            .order_by(TaskSession.started_at.desc())
            .limit(1)
        )
        if session is None:
            return
        session.ended_at = ended_at
        session.duration_seconds = max(
            0,
            int((ended_at - session.started_at).total_seconds()),
        )

    async def _report(
        self,
        telegram_user_id: int,
        period_start: date,
        period_end: date,
        group_same_titles: bool,
    ) -> list[ReportEntry]:
        statement = (
            select(
                Task.title,
                TaskLog.id,
                TaskLog.status,
                TaskSession.started_at,
                TaskSession.ended_at,
                TaskSession.duration_seconds,
            )
            .join(TaskLog, TaskLog.task_id == Task.id)
            .outerjoin(TaskSession, TaskSession.task_log_id == TaskLog.id)
            .where(
                Task.telegram_user_id == telegram_user_id,
                TaskLog.date >= period_start,
                TaskLog.date < period_end,
            )
            .order_by(TaskLog.date.asc(), TaskLog.id.asc())
        )
        rows = (await self.session.execute(statement)).all()
        now: datetime | None = None
        totals: dict[str | int, dict[str, object]] = {}

        for (
            title,
            log_id,
            status,
            started_at,
            ended_at,
            duration_seconds,
        ) in rows:
            clean_title = title.strip()
            key: str | int = (
                clean_title.casefold() if group_same_titles else log_id
            )
            entry = totals.setdefault(
                key,
                {
                    "title": clean_title,
                    "seconds": 0,
                    "completed_logs": set(),
                },
            )
            if started_at is not None:
                if ended_at is None:
                    now = now or local_now()
                    seconds = max(
                        0,
                        int((now - started_at).total_seconds()),
                    )
                else:
                    seconds = max(0, duration_seconds)
                entry["seconds"] = int(entry["seconds"]) + seconds
            if status == "done":
                completed_logs = entry["completed_logs"]
                assert isinstance(completed_logs, set)
                completed_logs.add(log_id)

        return [
            ReportEntry(
                title=str(entry["title"]),
                total_seconds=int(entry["seconds"]),
                completed_count=len(entry["completed_logs"]),
            )
            for entry in totals.values()
            if int(entry["seconds"]) > 0 or entry["completed_logs"]
        ]

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

