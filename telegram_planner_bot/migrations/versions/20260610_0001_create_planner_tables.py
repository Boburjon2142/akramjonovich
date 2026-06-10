"""create planner task tables

Revision ID: 20260610_0001
Revises:
Create Date: 2026-06-10
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260610_0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "planner_tasks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("telegram_user_id", sa.BigInteger(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("start_time", sa.Time(), nullable=False),
        sa.Column("end_time", sa.Time(), nullable=False),
        sa.Column("repeat_daily", sa.Boolean(), nullable=False),
        sa.Column("status", sa.String(length=16), nullable=False),
        sa.Column("started_at", sa.DateTime(), nullable=True),
        sa.Column("finished_at", sa.DateTime(), nullable=True),
        sa.Column("telegram_chat_id", sa.BigInteger(), nullable=True),
        sa.Column("telegram_message_id", sa.BigInteger(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("(CURRENT_TIMESTAMP)"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(),
            server_default=sa.text("(CURRENT_TIMESTAMP)"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_planner_tasks_telegram_user_id",
        "planner_tasks",
        ["telegram_user_id"],
        unique=False,
    )
    op.create_index(
        "ix_planner_task_user_date",
        "planner_tasks",
        ["telegram_user_id", "date"],
        unique=False,
    )

    op.create_table(
        "planner_task_logs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("task_id", sa.Integer(), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("status", sa.String(length=16), nullable=False),
        sa.Column("started_at", sa.DateTime(), nullable=True),
        sa.Column("finished_at", sa.DateTime(), nullable=True),
        sa.Column("telegram_chat_id", sa.BigInteger(), nullable=True),
        sa.Column("telegram_message_id", sa.BigInteger(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("(CURRENT_TIMESTAMP)"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["task_id"],
            ["planner_tasks.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "task_id",
            "date",
            name="uq_planner_task_log_date",
        ),
    )
    op.create_index(
        "ix_planner_task_logs_task_id",
        "planner_task_logs",
        ["task_id"],
        unique=False,
    )
    op.create_index(
        "ix_planner_log_status_date",
        "planner_task_logs",
        ["status", "date"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_planner_log_status_date",
        table_name="planner_task_logs",
    )
    op.drop_index(
        "ix_planner_task_logs_task_id",
        table_name="planner_task_logs",
    )
    op.drop_table("planner_task_logs")
    op.drop_index("ix_planner_task_user_date", table_name="planner_tasks")
    op.drop_index(
        "ix_planner_tasks_telegram_user_id",
        table_name="planner_tasks",
    )
    op.drop_table("planner_tasks")
