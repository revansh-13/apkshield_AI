from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.api.analysis import router as analysis_router
from app.api.history import router as history_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="APKShield AI",
    description="AI-powered Android APK Analysis Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(upload_router)
app.include_router(analysis_router)
app.include_router(history_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to APKShield AI",
        "status": "Server Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }