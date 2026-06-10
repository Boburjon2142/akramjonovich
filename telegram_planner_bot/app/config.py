import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


@dataclass(frozen=True)
class Settings:
    bot_token: str = os.getenv("PLANNER_BOT_TOKEN", "")
    database_url: str = os.getenv(
        "PLANNER_DATABASE_URL",
        "sqlite+aiosqlite:///planner.db",
    )
    timezone: str = os.getenv("PLANNER_TIMEZONE", "Asia/Tashkent")

    @property
    def sync_database_url(self) -> str:
        return self.database_url.replace("+aiosqlite", "")


settings = Settings()

