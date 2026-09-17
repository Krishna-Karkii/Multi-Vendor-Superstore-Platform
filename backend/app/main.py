from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from contextlib import asynccontextmanager
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from database import get_connection_pool, get_user_by_email, create_user, get_connection
import logging


logging.basicConfig(level=logging.INFO, handlers=[logging.StreamHandler()], force=True)
logger = logging.getLogger(__name__)

ph = PasswordHasher()

def hash_password(password: str):
    """Hash the password before storing in database."""
    return ph.hash(password)

def verify_password(hashed_password, password: str):
   """Verify the password."""
   return ph.verify(hashed_password, password)

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

class SignupRequest(BaseModel):
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
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email or Password!"
        )
    try:
        verify_password(user["password_hash"], data.password)
    except VerifyMismatchError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password!"
            )
    return {
        "message": "Verification Success",
        "email": user["email"]
    }
    

@app.post("/auth/signup")
async def signup(
    data: SignupRequest,
    conn = Depends(get_connection)
    ):
    try:
        user = await create_user(conn, data.email, hash_password(data.password))
        logger.info(user)
        return {
            "message": "signup successfull",
            "id": str(user["id"]),
            "email": user["email"]
        }
    except Exception as e:
        logger.info(e)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Signup Failed")