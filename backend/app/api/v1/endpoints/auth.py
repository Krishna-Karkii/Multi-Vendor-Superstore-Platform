from fastapi import APIRouter, Depends, HTTPException, status
from argon2.exceptions import VerifyMismatchError

from backend.app.core.database import get_user_by_email, get_connection, create_user
from backend.app.schemas.auth import LoginRequest, SignupRequest
from backend.app.core.security import hash_password, verify_password

import logging

logger = logging.getLogger()

router = APIRouter()


@router.post("/login")
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

@router.post("/signup")
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