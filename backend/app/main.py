from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from contextlib import asynccontextmanager

from database import get_connection_pool, get_user_by_email, get_connection
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

class LoginRequest(BaseModel):
    email: EmailStr
    password: str



@app.get("/health")
async def health():
    return {
        "status": "ok"
    }

@app.post("/auth/login")
async def login(
    data: LoginRequest, 
    conn = Depends(get_connection)
    ):
    user = await get_user_by_email(conn, data.email)

    if user:
        return {
            "message": "Validated Successfully",
            "email": data.email
        }
    else:
        return {
            "message": "validation Unsuccessfull",
            "email": data.email
        }
