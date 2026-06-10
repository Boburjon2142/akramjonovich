from aiogram import Dispatcher

from app.handlers.planner import router as planner_router


def register_handlers(dispatcher: Dispatcher) -> None:
    dispatcher.include_router(planner_router)

