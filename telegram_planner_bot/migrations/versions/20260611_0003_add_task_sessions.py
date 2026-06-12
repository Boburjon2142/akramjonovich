"""add planner task sessions

Revision ID: 20260611_0003
Revises: 20260611_0002
Create Date: 2026-06-11
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20260611_0003"
down_revision: Union[str, None] = "20260611_0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "planner_tasks",
        sa.Column("archived_at", sa.DateTime(), nullable=True),
    )
    op.create_table(
        "planner_task_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("task_log_id", sa.Integer(), nullable=False),
        sa.Column("started_at", sa.DateTime(), nullable=False),
        sa.Column("ended_at", sa.DateTime(), nullable=True),
        sa.Column(
            "duration_seconds",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("(CURRENT_TIMESTAMP)"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["task_log_id"],
            ["planner_task_logs.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_planner_task_sessions_task_log_id",
        "planner_task_sessions",
        ["task_log_id"],
        unique=False,
    )
    op.create_index(
        "ix_planner_session_log_started",
        "planner_task_sessions",
        ["task_log_id", "started_at"],
        unique=False,
    )

    op.execute(
        """
        INSERT INTO planner_task_sessions (
            task_log_id,
            started_at,
            ended_at,
            duration_seconds
        )
        SELECT
            id,
            started_at,
            finished_at,
            CASE
                WHEN finished_at IS NULL THEN 0
                ELSE MAX(
                    0,
                    CAST(
                        ROUND(
                            (julianday(finished_at) - julianday(started_at))
                            * 86400
                        ) AS INTEGER
                    )
                )
            END
        FROM planner_task_logs
        WHERE started_at IS NOT NULL
        """
    )


def downgrade() -> None:
    op.drop_index(
        "ix_planner_session_log_started",
        table_name="planner_task_sessions",
    )
    op.drop_index(
        "ix_planner_task_sessions_task_log_id",
        table_name="planner_task_sessions",
    )
    op.drop_table("planner_task_sessions")
    op.drop_column("planner_tasks", "archived_at")
