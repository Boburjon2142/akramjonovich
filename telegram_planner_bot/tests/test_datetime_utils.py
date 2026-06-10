from datetime import datetime

from app.utils.datetime import (
    format_duration,
    format_remaining,
    parse_date,
    parse_time_range,
)


def test_parse_valid_time_range():
    parsed = parse_time_range("09:00-10:30")
    assert parsed is not None
    assert parsed[0].strftime("%H:%M") == "09:00"
    assert parsed[1].strftime("%H:%M") == "10:30"


def test_rejects_invalid_or_reversed_time_range():
    assert parse_time_range("9:00-10:30") is None
    assert parse_time_range("10:30-09:00") is None
    assert parse_time_range("25:00-26:00") is None


def test_parse_date_requires_iso_format():
    assert parse_date("2026-06-10").isoformat() == "2026-06-10"
    assert parse_date("10.06.2026") is None


def test_duration_and_remaining_formatting():
    start = datetime(2026, 6, 10, 9, 0)
    finish = datetime(2026, 6, 10, 10, 18)
    assert format_duration(start, finish) == "1 soat 18 daqiqa"
    assert format_remaining(finish, datetime(2026, 6, 10, 8, 54)) == "01:24"

