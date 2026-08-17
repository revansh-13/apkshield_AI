from fastapi import APIRouter, HTTPException
from app.services.history import get_history_list, get_history_item, delete_history_item

router = APIRouter()

@router.get("/history")
def list_history():
    """
    Retrieve a lightweight list of all previous analyses.
    """
    return {
        "status": "success",
        "history": get_history_list()
    }

@router.get("/history/{analysis_id}")
def get_analysis(analysis_id: str):
    """
    Retrieve the complete record for a single analysis.
    """
    record = get_history_item(analysis_id)
    return {
        "status": "success",
        "record": record
    }

@router.delete("/history/{analysis_id}")
def delete_analysis(analysis_id: str):
    """
    Delete a historical analysis and its associated APK file.
    """
    delete_history_item(analysis_id)
    return {
        "status": "success",
        "message": f"Analysis {analysis_id} deleted successfully."
    }
