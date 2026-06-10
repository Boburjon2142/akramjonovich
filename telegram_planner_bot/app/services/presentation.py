from app.models.planner import Task, TaskLog
from app.utils.datetime import combine_local, format_remaining, local_now


STATUS_LABELS = {
    "planned": "Kutilmoqda",
    "active": "Faol",
    "done": "Tugatilgan",
}


def active_task_text(task: Task, log: TaskLog) -> tuple[str, bool]:
    end_at = combine_local(log.date, task.end_time)
    expired = end_at <= local_now()

    if expired:
        return (
            "⏰ Vaqt tugadi\n\n"
            f"📌 Vazifa: {task.title}\n"
            f"🕐 Tugash vaqti: {task.end_time.strftime('%H:%M')}",
            True,
        )

    return (
        "⏳ Faol vazifa\n\n"
        f"📌 Vazifa: {task.title}\n"
        f"🕐 Tugash vaqti: {task.end_time.strftime('%H:%M')}\n"
        f"⏳ Qolgan vaqt: {format_remaining(end_at)}",
        False,
    )

