from app.models.planner import Task, TaskLog
from app.utils.datetime import (
    combine_local,
    format_remaining,
    format_seconds,
    local_now,
)


STATUS_LABELS = {
    "planned": "Kutilmoqda",
    "active": "Faol",
    "paused": "Pauzada",
    "done": "Tugatilgan",
    "cancelled": "Arxivlangan",
}


def active_task_text(
    task: Task,
    log: TaskLog,
    elapsed_seconds: int = 0,
) -> tuple[str, bool]:
    end_at = combine_local(log.date, task.end_time)
    expired = end_at <= local_now()
    elapsed = format_seconds(elapsed_seconds)

    if log.status == "paused":
        return (
            "Vazifa pauzada\n\n"
            f"Vazifa: {task.title}\n"
            f"Sarflangan vaqt: {elapsed}",
            expired,
        )

    if expired:
        return (
            "Vaqt tugadi\n\n"
            f"Vazifa: {task.title}\n"
            f"Tugash vaqti: {task.end_time.strftime('%H:%M')}\n"
            f"Sarflangan vaqt: {elapsed}",
            True,
        )

    return (
        "Faol vazifa\n\n"
        f"Vazifa: {task.title}\n"
        f"Tugash vaqti: {task.end_time.strftime('%H:%M')}\n"
        f"Qolgan vaqt: {format_remaining(end_at)}\n"
        f"Sarflangan vaqt: {elapsed}",
        False,
    )
