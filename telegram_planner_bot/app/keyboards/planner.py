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


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text=TODAY_TASKS)],
            [
                KeyboardButton(text=ADD_TASK),
                KeyboardButton(text=ACTIVE_TASK),
            ],
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


def done_keyboard(task_id: int, expired: bool = False) -> InlineKeyboardMarkup:
    label = "✅ Tugatdim" if expired else "✅ Tugatish"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text=label,
                    callback_data=f"planner_done:{task_id}",
                )
            ]
        ]
    )

