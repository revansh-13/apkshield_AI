from fastapi import APIRouter, UploadFile, File, HTTPException
from app.utils.file_handler import (
    validate_file,
    save_uploaded_file,
    get_file_metadata,
)

router = APIRouter()


@router.post("/upload", status_code=201)
def upload_apk(file: UploadFile = File(...)):

    validation = validate_file(file)

    if not validation["valid"]:
        raise HTTPException(
            status_code=400,
            detail=validation["errors"]
        )

    saved_file = save_uploaded_file(file)

    metadata = get_file_metadata(
        upload_id=saved_file["upload_id"],
        original_filename=file.filename,
        saved_filename=saved_file["saved_filename"],
        saved_path=saved_file["saved_path"],
    )

    return {
        "status": "success",
        "message": "APK uploaded successfully.",
        "metadata": metadata,
        "ready_for_analysis": True
    }