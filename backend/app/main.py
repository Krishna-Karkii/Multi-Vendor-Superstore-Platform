from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.app.core.database import get_connection_pool
from backend.app.api.v1.router import api_router

import logging


logging.basicConfig(level=logging.INFO, handlers=[logging.StreamHandler()], force=True)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.db_pool = await get_connection_pool()
    yield
    if app.state.db_pool:
        await app.state.db_pool.close()

app = FastAPI(title="SuperStore", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5173",
        "http://localhost:5173"
        ],
    allow_headers="*",
    allow_methods="*",
    allow_credentials=True
)

app.include_router(api_router)

@app.get("/health")
async def health():
    return {
        "status": "ok"
    }