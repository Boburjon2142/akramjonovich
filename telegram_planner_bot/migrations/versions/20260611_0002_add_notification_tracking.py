"""add planner notification tracking

Revision ID: 20260611_0002
Revises: 20260610_0001
Create Date: 2026-06-11
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260611_0002"
down_revision: Union[str, None] = "20260610_0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "planner_task_logs",
        sa.Column("notified_at", sa.DateTime(), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("planner_task_logs", "notified_at")
