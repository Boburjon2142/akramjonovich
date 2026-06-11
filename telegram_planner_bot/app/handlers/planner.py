from datetime import timedelta

from aiogram import F, Router, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext

from app.database import session_factory
from app.keyboards.planner import (
    ACTIVE_TASK,
    ADD_TASK,
    TODAY_TASKS,
    date_keyboard,
    done_keyboard,
    main_menu_keyboard,
    remove_keyboard,
    repeat_keyboard,
    task_list_keyboard,
)
from app.services.countdown import CountdownService
from app.services.planner import (
    ActiveTaskExistsError,
    PlannerService,
    TaskAlreadyDoneError,
    TaskNotFoundError,
    TaskWithLog,
)
from app.services.presentation import STATUS_LABELS, active_task_text
from app.states.planner import AddTaskStates
from app.utils.datetime import (
    format_duration,
    local_now,
    parse_date,
    parse_time_range,
)


router = Router(name="planner")


@router.message(CommandStart())
async def start(message: types.Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer(
        "Kunlik vazifalaringizni shu yerda boshqarishingiz mumkin.",
        reply_markup=main_menu_keyboard(),
    )


@router.message(F.text == ADD_TASK)
async def add_task(message: types.Message, state: FSMContext) -> None:
    await state.set_state(AddTaskStates.title)
    await message.answer("Vazifa nomini kiriting:", reply_markup=remove_keyboard())


@router.message(AddTaskStates.title)
async def receive_title(message: types.Message, state: FSMContext) -> None:
    title = (message.text or "").strip()
    if not title:
        await message.answer("Vazifa nomini kiriting:")
        return

    await state.update_data(title=title[:255])
    await state.set_state(AddTaskStates.date_choice)
    await message.answer("Sana tanlang:", reply_markup=date_keyboard())


@router.message(AddTaskStates.date_choice, F.text.in_({"Bugun", "Ertaga"}))
async def receive_quick_date(
    message: types.Message,
    state: FSMContext,
) -> None:
    task_date = local_now().date()
    if message.text == "Ertaga":
        task_date += timedelta(days=1)
    await state.update_data(task_date=task_date.isoformat())
    await ask_time(message, state)


@router.message(AddTaskStates.date_choice, F.text == "Sana kiritish")
async def request_custom_date(
    message: types.Message,
    state: FSMContext,
) -> None:
    await state.set_state(AddTaskStates.custom_date)
    await message.answer(
        "Sanani YYYY-MM-DD formatida kiriting.\nMasalan: 2026-06-10",
        reply_markup=remove_keyboard(),
    )


@router.message(AddTaskStates.date_choice)
async def invalid_date_choice(message: types.Message) -> None:
    await message.answer("Bugun, Ertaga yoki Sana kiritish tugmasini tanlang.")


@router.message(AddTaskStates.custom_date)
async def receive_custom_date(
    message: types.Message,
    state: FSMContext,
) -> None:
    task_date = parse_date(message.text or "")
    if task_date is None:
        await message.answer(
            "Sana formati noto‘g‘ri. Masalan: 2026-06-10"
        )
        return

    await state.update_data(task_date=task_date.isoformat())
    await ask_time(message, state)


async def ask_time(message: types.Message, state: FSMContext) -> None:
    await state.set_state(AddTaskStates.time_range)
    await message.answer(
        "Vaqtni kiriting.\nFormat: 09:00-10:30",
        reply_markup=remove_keyboard(),
    )


@router.message(AddTaskStates.time_range)
async def receive_time_range(
    message: types.Message,
    state: FSMContext,
) -> None:
    parsed = parse_time_range(message.text or "")
    if parsed is None:
        await message.answer(
            "Vaqt formati noto‘g‘ri. Masalan: 09:00-10:30"
        )
        return

    start_time, end_time = parsed
    await state.update_data(
        start_time=start_time.strftime("%H:%M"),
        end_time=end_time.strftime("%H:%M"),
    )
    await state.set_state(AddTaskStates.repeat_daily)
    await message.answer(
        "Har kuni takrorlansinmi?",
        reply_markup=repeat_keyboard(),
    )


@router.message(AddTaskStates.repeat_daily, F.text.in_({"Ha", "Yo‘q"}))
async def receive_repeat(
    message: types.Message,
    state: FSMContext,
    countdown: CountdownService,
) -> None:
    data = await state.get_data()
    task_date = parse_date(data["task_date"])
    time_range = parse_time_range(
        f"{data['start_time']}-{data['end_time']}"
    )

    if task_date is None or time_range is None:
        await state.clear()
        await message.answer(
            "Ma’lumotlarni saqlashda xatolik yuz berdi.",
            reply_markup=main_menu_keyboard(),
        )
        return

    start_time, end_time = time_range
    async with session_factory() as session:
        task = await PlannerService(session).create_task(
            telegram_user_id=message.from_user.id,
            title=data["title"],
            task_date=task_date,
            start_time=start_time,
            end_time=end_time,
            repeat_daily=message.text == "Ha",
            telegram_chat_id=message.chat.id,
        )
    await countdown.schedule_task_notification(task)

    await state.clear()
    await message.answer(
        "✅ Vazifa qo‘shildi:\n"
        f"{task.title}\n"
        f"{task.date.isoformat()}\n"
        f"{task.start_time.strftime('%H:%M')}-"
        f"{task.end_time.strftime('%H:%M')}",
        reply_markup=main_menu_keyboard(),
    )


@router.message(AddTaskStates.repeat_daily)
async def invalid_repeat(message: types.Message) -> None:
    await message.answer("Ha yoki Yo‘q tugmasini tanlang.")


@router.message(F.text == TODAY_TASKS)
async def today_tasks(message: types.Message) -> None:
    async with session_factory() as session:
        items = await PlannerService(session).list_for_date(
            message.from_user.id,
            local_now().date(),
        )

    if not items:
        await message.answer(
            "Bugun uchun vazifalar yo‘q.",
            reply_markup=main_menu_keyboard(),
        )
        return

    text, task_ids = render_task_list(items)
    await message.answer(
        text,
        reply_markup=task_list_keyboard(task_ids),
    )


@router.message(F.text == ACTIVE_TASK)
async def active_task(
    message: types.Message,
    countdown: CountdownService,
) -> None:
    async with session_factory() as session:
        item = await PlannerService(session).get_active(message.from_user.id)

    if item is None:
        await message.answer(
            "Hozir faol vazifa yo‘q.",
            reply_markup=main_menu_keyboard(),
        )
        return

    text, expired = active_task_text(item.task, item.log)
    sent = await message.answer(
        text,
        reply_markup=done_keyboard(item.task.id, expired),
    )

    async with session_factory() as session:
        await PlannerService(session).save_message(
            item.task.id,
            item.log.date,
            sent.chat.id,
            sent.message_id,
        )
    if not expired:
        countdown.schedule(item.log.id)


@router.callback_query(F.data.startswith("planner_start:"))
async def start_task_callback(
    callback: types.CallbackQuery,
    countdown: CountdownService,
) -> None:
    task_id = parse_callback_id(callback.data)
    if task_id is None:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return

    try:
        async with session_factory() as session:
            item = await PlannerService(session).start_task(
                task_id,
                callback.from_user.id,
                local_now().date(),
            )
    except TaskNotFoundError:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return
    except TaskAlreadyDoneError:
        await callback.answer(
            "Bu vazifa allaqachon tugatilgan",
            show_alert=True,
        )
        return
    except ActiveTaskExistsError:
        await callback.answer(
            "Avval faol vazifani tugating.",
            show_alert=True,
        )
        return

    text, expired = active_task_text(item.task, item.log)
    sent = await callback.message.answer(
        text,
        reply_markup=done_keyboard(item.task.id, expired),
    )
    async with session_factory() as session:
        await PlannerService(session).save_message(
            item.task.id,
            item.log.date,
            sent.chat.id,
            sent.message_id,
        )
    if not expired:
        countdown.schedule(item.log.id)
    await callback.answer("Vazifa boshlandi")


@router.callback_query(F.data.startswith("planner_done:"))
async def finish_task_callback(
    callback: types.CallbackQuery,
    countdown: CountdownService,
) -> None:
    task_id = parse_callback_id(callback.data)
    if task_id is None:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return

    try:
        async with session_factory() as session:
            item = await PlannerService(session).finish_task(
                task_id,
                callback.from_user.id,
            )
    except TaskNotFoundError:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return
    except TaskAlreadyDoneError:
        await callback.answer(
            "Bu vazifa allaqachon tugatilgan",
            show_alert=True,
        )
        return

    countdown.stop(item.log.id)
    duration = format_duration(item.log.started_at, item.log.finished_at)
    await callback.message.edit_text(
        "✅ Vazifa tugatildi:\n"
        f"{item.task.title}\n\n"
        f"Sarflangan vaqt: {duration}"
    )
    await callback.answer("Vazifa tugatildi")


@router.callback_query(F.data.startswith("planner_delete:"))
async def delete_task_callback(
    callback: types.CallbackQuery,
    countdown: CountdownService,
) -> None:
    task_id = parse_callback_id(callback.data)
    if task_id is None:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return

    async with session_factory() as session:
        service = PlannerService(session)
        try:
            active = await service.get_active_by_task(
                task_id,
                callback.from_user.id,
            )
        except (TaskNotFoundError, TaskAlreadyDoneError):
            active = None
        deleted = await service.delete_task(task_id, callback.from_user.id)

    if not deleted:
        await callback.answer("Vazifa topilmadi", show_alert=True)
        return
    if active:
        countdown.stop(active.log.id)
    countdown.stop_task_notification(task_id)

    async with session_factory() as session:
        items = await PlannerService(session).list_for_date(
            callback.from_user.id,
            local_now().date(),
        )
    if items:
        text, task_ids = render_task_list(items)
        await callback.message.edit_text(
            text,
            reply_markup=task_list_keyboard(task_ids),
        )
    else:
        await callback.message.edit_text("Bugun uchun vazifalar yo‘q.")
    await callback.answer("Vazifa o‘chirildi")


def parse_callback_id(data: str | None) -> int | None:
    if not data or ":" not in data:
        return None
    try:
        return int(data.split(":", maxsplit=1)[1])
    except ValueError:
        return None


def render_task_list(items: list[TaskWithLog]) -> tuple[str, list[int]]:
    lines = ["📋 Bugungi vazifalar", ""]
    for index, item in enumerate(items, start=1):
        lines.extend(
            [
                f"{index}. {item.task.start_time.strftime('%H:%M')}–"
                f"{item.task.end_time.strftime('%H:%M')} — {item.task.title}",
                f"   Status: {STATUS_LABELS[item.log.status]}",
                "",
            ]
        )
    return "\n".join(lines).rstrip(), [item.task.id for item in items]
