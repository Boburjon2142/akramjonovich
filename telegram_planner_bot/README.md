# Telegram Planner Bot

Portfolio va boshqa botlardan mustaqil ishlaydigan sodda kunlik vazifalar boti.

## Imkoniyatlar

- Vazifa qo‘shish
- Bugungi vazifalarni ko‘rish
- Vazifani boshlash va tugatish
- Qolgan vaqtni har daqiqada yangilash
- Vazifani o‘chirish
- Har kuni takrorlanadigan vazifa
- Har kun uchun alohida `TaskLog` holati

## O‘rnatish

```powershell
cd telegram_planner_bot
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

`.env` ichida `PLANNER_BOT_TOKEN` qiymatini kiriting.

## Migration

Migration nomi:

```text
20260610_0001_create_planner_tables
```

Migrationni qo‘llash:

```powershell
alembic upgrade head
```

## Ishga tushirish

```powershell
python run.py
```

## Test

```powershell
pytest
```

Botning database fayli standart holatda
`telegram_planner_bot/planner.db` ichida yaratiladi.
