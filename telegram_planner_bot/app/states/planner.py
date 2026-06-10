from aiogram.fsm.state import State, StatesGroup


class AddTaskStates(StatesGroup):
    title = State()
    date_choice = State()
    custom_date = State()
    time_range = State()
    repeat_daily = State()

