from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="SuperStore")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173"],
    allow_headers="*",
    allow_methods="*",
    allow_credentials=True
)

class LoginRequest(BaseModel):
    email: str
    password: str


@app.get("/health")
async def health():
    return {
        "status": "200"
    }

@app.post("/auth/login")
async def login(data: LoginRequest):
    return {
        "message": "Received Login",
        "email": data.email
    }
