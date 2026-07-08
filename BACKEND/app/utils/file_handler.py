#only place responsible for:
# Saving uploaded files
# Creating UUIDs
# Validating extensions
# Returning file metadata
import uuid
from fastapi import UploadFile
import os
import shutil
from datetime import datetime


def generate_upload_id():
    return str(uuid.uuid4())

   

MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB
def validate_file(file: UploadFile) -> dict:

    errors = []

    # -------------------------
    # Check 1: File extension
    # -------------------------
    if not file.filename.lower().endswith(".apk"):
        errors.append("Invalid file extension. Only .apk files are allowed.")

    # -------------------------
    # Check 2: Empty file
    # -------------------------
    current_position = file.file.tell()

    file.file.seek(0, 2)          # Move to end
    file_size = file.file.tell()  # Get size
    file.file.seek(current_position)

    if file_size == 0:
        errors.append("The uploaded file is empty.")

    # -------------------------
    # Check 3: Maximum size
    # -------------------------
    if file_size > MAX_FILE_SIZE:
        errors.append("File size exceeds the maximum limit of 100 MB.")

    return {
        "valid": len(errors) == 0,
        "errors": errors,
        "file_size": file_size
    }


def save_uploaded_file(file: UploadFile):

    # Step 1: Generate UUID
    upload_id = generate_upload_id()

    # Step 2: Upload folder
    upload_folder = "uploads"

    # Step 3: Create folder if it doesn't exist
    os.makedirs(upload_folder, exist_ok=True)

    # Step 4: Create saved filename
    saved_filename = f"{upload_id}.apk"

    # Step 5: Create full path
    saved_path = os.path.join(upload_folder, saved_filename)

    # Step 6: Save file
    with open(saved_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 7: Return information
    return {
        "upload_id": upload_id,
        "saved_filename": saved_filename,
        "saved_path": saved_path
    }

def get_file_metadata(
    upload_id,
    original_filename,
    saved_filename,
    saved_path,
):
    return {
        "upload_id": upload_id,
        "original_filename": original_filename,
        "saved_filename": saved_filename,
        "saved_path": saved_path,
        "file_size": os.path.getsize(saved_path),
        "upload_time": datetime.utcnow().isoformat() + "Z"
    }
