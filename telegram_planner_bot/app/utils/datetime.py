import re
from datetime import date, datetime, time

import pytz

from app.config import settings


TIME_RANGE_PATTERN = re.compile(
    r"^(?P<start>[01]\d|2[0-3]):(?P<start_min>[0-5]\d)-"
    r"(?P<end>[01]\d|2[0-3]):(?P<end_min>[0-5]\d)$"
)


def parse_time_range(value: str) -> tuple[time, time] | None:
    match = TIME_RANGE_PATTERN.fullmatch(value.strip())
    if not match:
        return None

    start = time(int(match["start"]), int(match["start_min"]))
    end = time(int(match["end"]), int(match["end_min"]))
    if end <= start:
        return None
    return start, end


def parse_date(value: str) -> date | None:
    try:
        return datetime.strptime(value.strip(), "%Y-%m-%d").date()
    except ValueError:
        return None


def local_now() -> datetime:
    return datetime.now(pytz.timezone(settings.timezone)).replace(tzinfo=None)


def combine_local(day: date, clock: time) -> datetime:
    return datetime.combine(day, clock)


def format_remaining(end_at: datetime, now: datetime | None = None) -> str:
    seconds = max(0, int((end_at - (now or local_now())).total_seconds()))
    hours, remainder = divmod(seconds, 3600)
    minutes = remainder // 60
    return f"{hours:02d}:{minutes:02d}"


def format_duration(started_at: datetime, finished_at: datetime) -> str:
    minutes = max(0, int((finished_at - started_at).total_seconds() // 60))
    hours, minutes = divmod(minutes, 60)
    if hours and minutes:
        return f"{hours} soat {minutes} daqiqa"
    if hours:
        return f"{hours} soat"
    return f"{minutes} daqiqa"

