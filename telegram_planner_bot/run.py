import asyncio
import logging

from aiogram import Bot, Dispatcher

from app.config import settings
from app.database import dispose_database
from app.handlers import register_handlers
from app.services.countdown import CountdownService


async def main() -> None:
    if not settings.bot_token:
        raise RuntimeError(
            "PLANNER_BOT_TOKEN topilmadi. .env.example asosida .env yarating."
        )

    bot = Bot(settings.bot_token)
    dispatcher = Dispatcher()
    countdown = CountdownService(bot)

    dispatcher["countdown"] = countdown
    register_handlers(dispatcher)

    await countdown.start()
    await countdown.restore_active_tasks()

    try:
        await bot.delete_webhook(drop_pending_updates=True)
        await dispatcher.start_polling(
            bot,
            allowed_updates=dispatcher.resolve_used_update_types(),
        )
    finally:
        await countdown.shutdown()
        await bot.session.close()
        await dispose_database()


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    asyncio.run(main())

