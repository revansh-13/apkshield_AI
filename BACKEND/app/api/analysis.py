from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.analysis import analyze_apk


router = APIRouter()


class AnalysisRequest(BaseModel):
    saved_path: str


@router.post("/analyze")
def analyze(request: AnalysisRequest):
    """
    Analyze an uploaded APK.
    """

    result = analyze_apk(request.saved_path)

    if not result.get("success", True):
        raise HTTPException(
            status_code=400,
            detail=result["error"],
        )

    return {
        "status": "success",
        "message": "APK analyzed successfully.",
        "result": result,
    }