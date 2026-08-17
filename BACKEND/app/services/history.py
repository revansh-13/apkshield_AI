import os
import json
import re
from datetime import date, datetime
from fastapi import HTTPException

# Storage directory
STORAGE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "storage", "analyses")
os.makedirs(STORAGE_DIR, exist_ok=True)

def _json_safe(value):
    """Convert supported non-JSON-native values for persistence only."""
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, dict):
        return {_json_safe(key): _json_safe(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [_json_safe(item) for item in value]
    return value

def _is_valid_uuid(val: str) -> bool:
    """Validate that the string is a valid UUID to prevent path traversal."""
    return bool(re.match(r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\Z", val, re.I))

def _get_file_path(analysis_id: str) -> str:
    """Get the absolute path for an analysis JSON file."""
    if not _is_valid_uuid(analysis_id):
        raise HTTPException(status_code=400, detail="Invalid analysis ID format.")
    return os.path.join(STORAGE_DIR, f"{analysis_id}.json")

def save_analysis(upload_id: str, metadata: dict, result: dict) -> dict:
    """
    Save the complete analysis result to disk as JSON.
    Returns the saved record.
    """
    if not _is_valid_uuid(upload_id):
        raise ValueError("Invalid upload ID format.")
        
    record = {
        "analysis_id": upload_id,
        "metadata": metadata,
        "result": result,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }
    
    file_path = _get_file_path(upload_id)
    serializable_record = _json_safe(record)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(serializable_record, f, ensure_ascii=False, indent=2)
        
    return record

def get_history_list() -> list:
    """
    Returns a lightweight list of previous analyses.
    """
    history = []
    
    for filename in os.listdir(STORAGE_DIR):
        if not filename.endswith(".json"):
            continue
            
        file_path = os.path.join(STORAGE_DIR, filename)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                record = json.load(f)
                
                # Extract lightweight summary
                risk = record.get("result", {}).get("risk", {})
                metadata = record.get("metadata", {})
                
                # Count findings
                findings = risk.get("findings", [])
                severity_counts = {"critical": 0, "high": 0, "medium": 0, "low": 0, "info": 0}
                for finding in findings:
                    sev = finding.get("severity", "info").lower()
                    if sev in severity_counts:
                        severity_counts[sev] += 1
                        
                summary = {
                    "analysis_id": record.get("analysis_id"),
                    "apkName": metadata.get("original_filename", "unknown.apk"),
                    "fileSizeMb": round(metadata.get("file_size", 0) / (1024 * 1024), 2),
                    "riskScore": risk.get("risk_score", 0),
                    "riskLevel": risk.get("risk_level", "INFO"),
                    "totalFindings": len(findings),
                    "severityCounts": severity_counts,
                    "timestamp": record.get("created_at")
                }
                history.append(summary)
        except Exception:
            # Skip corrupted or invalid files
            continue
            
    # Sort by descending timestamp (newest first)
    history.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
    return history

def get_history_item(analysis_id: str) -> dict:
    """
    Returns the complete analysis record.
    """
    file_path = _get_file_path(analysis_id)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Analysis not found.")
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to read analysis record.")

def delete_history_item(analysis_id: str) -> bool:
    """
    Deletes the analysis JSON record and the associated APK file if it exists.
    """
    # 1. Delete JSON record
    json_path = _get_file_path(analysis_id)
    if os.path.exists(json_path):
        os.remove(json_path)
        
    # 2. Delete APK file (best effort)
    try:
        uploads_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
        apk_path = os.path.join(uploads_dir, f"{analysis_id}.apk")
        if os.path.exists(apk_path):
            os.remove(apk_path)
    except Exception:
        pass
        
    return True
