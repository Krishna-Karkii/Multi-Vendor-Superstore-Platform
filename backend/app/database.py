import asyncpg
import os
from fastapi import Request
from dotenv import load_dotenv
import logging

logger = logging.getLogger(__name__)

load_dotenv()

async def get_connection_pool():
    """Create a database connection pool to manage connections."""
    return await asyncpg.create_pool(
            os.getenv("DB_URL"),
            min_size=5,
            max_size=20
        )


async def create_user(
        conn: asyncpg.Connection,
        email: str,
        password_hash: str
        ) -> asyncpg.Connection.fetchrow:
    """Create a new user with unique email as a constrain."""
    return await conn.fetchrow("INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
                    email, password_hash)


async def get_user_by_email(
        conn: asyncpg.Connection,
        email: str
        ) -> asyncpg.Connection.fetchrow:
    """Get a user based on their email if exists."""
    return await conn.fetchrow("Select * from users where email = $1",
                               email)

async def get_connection(
        request: Request
        ) -> asyncpg.Connection:
    """Get a connection from the database pool to make request."""
    async with request.app.state.db_pool.acquire() as conn:
        yield conn

