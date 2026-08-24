from fastapi import FastAPI

app = FastAPI(title="SuperStore")

@app.get("/health")
async def health():
    return {
        "status": "200"
    }