from datetime import date, datetime, time

import pytest
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.models import Base, TaskLog, TaskSession
from app.services.planner import PlannerService


@pytest.mark.asyncio
async def test_recurring_task_keeps_daily_status_separate():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    session_maker = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    async with session_maker() as session:
        service = PlannerService(session)
        task = await service.create_task(
            telegram_user_id=12345,
            title="IELTS Reading",
            task_date=date(2026, 6, 10),
            start_time=time(9, 0),
            end_time=time(10, 30),
            repeat_daily=True,
        )

        first_day = await service.list_for_date(12345, date(2026, 6, 10))
        assert first_day[0].log.status == "planned"

        active = await service.start_task(task.id, 12345, date(2026, 6, 10))
        assert active.log.status == "active"

        finished = await service.finish_task(task.id, 12345)
        assert finished.log.status == "done"

        second_day = await service.list_for_date(12345, date(2026, 6, 11))
        assert second_day[0].task.id == task.id
        assert second_day[0].log.status == "planned"

    await engine.dispose()


@pytest.mark.asyncio
async def test_notification_is_only_prepared_once_per_day():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    session_maker = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    async with session_maker() as session:
        service = PlannerService(session)
        task = await service.create_task(
            telegram_user_id=12345,
            telegram_chat_id=54321,
            title="Daily planning",
            task_date=date(2026, 6, 11),
            start_time=time(9, 0),
            end_time=time(9, 30),
            repeat_daily=True,
        )

        first = await service.prepare_notification(
            task.id,
            date(2026, 6, 11),
        )
        assert first is not None
        assert first.task.telegram_chat_id == 54321

        await service.mark_notification_sent(
            first.log.id,
            datetime(2026, 6, 11, 9, 0),
        )
        duplicate = await service.prepare_notification(
            task.id,
            date(2026, 6, 11),
        )
        assert duplicate is None

        next_day = await service.prepare_notification(
            task.id,
            date(2026, 6, 12),
        )
        assert next_day is not None

    await engine.dispose()


@pytest.mark.asyncio
async def test_pause_resume_and_monthly_report_group_same_titles(
    monkeypatch,
):
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    session_maker = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)

    moments = iter(
        [
            datetime(2026, 6, 11, 9, 0),
            datetime(2026, 6, 11, 9, 20),
            datetime(2026, 6, 11, 9, 35),
            datetime(2026, 6, 11, 10, 5),
            datetime(2026, 6, 12, 10, 0),
        ]
    )
    monkeypatch.setattr(
        "app.services.planner.local_now",
        lambda: next(moments),
    )

    async with session_maker() as session:
        service = PlannerService(session)
        task = await service.create_task(
            telegram_user_id=12345,
            title="Reading",
            task_date=date(2026, 6, 11),
            start_time=time(9, 0),
            end_time=time(11, 0),
            repeat_daily=False,
        )

        started = await service.start_task(
            task.id,
            12345,
            date(2026, 6, 11),
        )
        paused = await service.pause_task(task.id, 12345)
        assert paused.log.status == "paused"

        resumed = await service.resume_task(task.id, 12345)
        assert resumed.log.status == "active"

        finished = await service.finish_task(task.id, 12345)
        assert finished.log.status == "done"
        assert await service.elapsed_seconds(finished.log.id) == 3000
        daily = await service.daily_report(12345, date(2026, 6, 11))
        assert len(daily) == 1
        assert daily[0].total_seconds == 3000

        second_task = await service.create_task(
            telegram_user_id=12345,
            title=" reading ",
            task_date=date(2026, 6, 12),
            start_time=time(8, 0),
            end_time=time(9, 0),
            repeat_daily=False,
        )
        second_log = TaskLog(
            task_id=second_task.id,
            date=date(2026, 6, 12),
            status="done",
            started_at=datetime(2026, 6, 12, 8, 0),
            finished_at=datetime(2026, 6, 12, 8, 40),
        )
        session.add(second_log)
        await session.flush()
        session.add(
            TaskSession(
                task_log_id=second_log.id,
                started_at=datetime(2026, 6, 12, 8, 0),
                ended_at=datetime(2026, 6, 12, 8, 40),
                duration_seconds=2400,
            )
        )
        await session.commit()

        monthly = await service.monthly_report(12345, 2026, 6)
        assert len(monthly) == 1
        assert monthly[0].title == "Reading"
        assert monthly[0].total_seconds == 5400
        assert monthly[0].completed_count == 2

        assert await service.delete_task(task.id, 12345) is True
        today_tasks = await service.list_for_date(
            12345,
            date(2026, 6, 11),
        )
        assert today_tasks == []
        archived_report = await service.monthly_report(12345, 2026, 6)
        assert archived_report[0].total_seconds == 5400

    await engine.dispose()
