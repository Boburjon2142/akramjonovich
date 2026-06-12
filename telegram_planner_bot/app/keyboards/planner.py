from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
)


TODAY_TASKS = "📋 Bugungi vazifalar"
ADD_TASK = "➕ Vazifa qo‘shish"
ACTIVE_TASK = "⏳ Faol vazifa"
REPORTS = "📊 Hisobotlar"
DAILY_REPORT = "📅 Bugungi hisobot"
MONTHLY_REPORT = "🗓 Oylik hisobot"


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=TODAY_TASKS)],
            [
                KeyboardButton(text=ADD_TASK),
                KeyboardButton(text=ACTIVE_TASK),
            ],
            [KeyboardButton(text=REPORTS)],
        ],
        resize_keyboard=True,
    )


def date_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text="Bugun"),
                KeyboardButton(text="Ertaga"),
            ],
            [KeyboardButton(text="Sana kiritish")],
        ],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


def repeat_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text="Ha"),
                KeyboardButton(text="Yo‘q"),
            ]
        ],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


def remove_keyboard() -> ReplyKeyboardRemove:
    return ReplyKeyboardRemove()


def task_list_keyboard(task_ids: list[int]) -> InlineKeyboardMarkup:
    rows = []
    for task_id in task_ids:
        rows.append(
            [
                InlineKeyboardButton(
                    text="▶️ Boshlash",
                    callback_data=f"planner_start:{task_id}",
                ),
                InlineKeyboardButton(
                    text="❌ O‘chirish",
                    callback_data=f"planner_delete:{task_id}",
                ),
            ]
        )
    return InlineKeyboardMarkup(inline_keyboard=rows)


def task_control_keyboard(
    task_id: int,
    status: str,
    expired: bool = False,
) -> InlineKeyboardMarkup:
    if status == "paused":
        action = InlineKeyboardButton(
            text="▶️ Davom ettirish",
            callback_data=f"planner_resume:{task_id}",
        )
    else:
        action = InlineKeyboardButton(
            text="⏸ Pauza",
            callback_data=f"planner_pause:{task_id}",
        )

    finish_label = "✅ Tugatdim" if expired else "✅ Tugatish"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [action],
            [
                InlineKeyboardButton(
                    text=finish_label,
                    callback_data=f"planner_done:{task_id}",
                )
            ],
        ]
    )


def done_keyboard(task_id: int, expired: bool = False) -> InlineKeyboardMarkup:
    return task_control_keyboard(task_id, "active", expired)


def reports_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text=DAILY_REPORT),
                KeyboardButton(text=MONTHLY_REPORT),
            ],
            [KeyboardButton(text=TODAY_TASKS)],
        ],
        resize_keyboard=True,
    )


def reminder_keyboard(task_id: int) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Boshlash",
                    callback_data=f"planner_start:{task_id}",
                )
            ]
        ]
    )
