from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.analysis import analyze_apk
from app.services.history import save_analysis


router = APIRouter()


class AnalysisRequest(BaseModel):
    saved_path: str
    metadata: dict = {}


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

    # Persist the analysis record
    upload_id = request.metadata.get("upload_id")
    if upload_id:
        save_analysis(upload_id, request.metadata, result)

    return {
        "status": "success",
        "message": "APK analyzed successfully.",
        "result": result,
    }