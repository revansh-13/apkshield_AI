from fastapi import FastAPI
from app.api.upload import router as upload_router
from app.api.analysis import router as analysis_router

app = FastAPI(
    title="APKShield AI",
    description="AI-powered Android APK Analysis Platform",
    version="1.0.0"
)
app.include_router(upload_router)
app.include_router(analysis_router)

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