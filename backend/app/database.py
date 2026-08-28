import asyncpg
import os
from fastapi import Request
from dotenv import load_dotenv

load_dotenv()

async def get_connection_pool():
    return await asyncpg.create_pool(
            os.getenv("DB_URL"),
            min_size=5,
            max_size=20
        )


async def get_user_by_email(
        connnection: asyncpg.Connection,
        email: str
):
    return await connnection.fetchrow("Select * from users where email = $1",
                               email)

async def get_connection(request: Request):
    async with request.app.state.db_pool.acquire() as conn:
        yield conn

