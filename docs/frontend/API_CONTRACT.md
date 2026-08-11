# API Contract

> **Source of truth:** This document reflects the actual backend implementation
> as of the current codebase. Do not invent fields.

---

## Step 1 — Upload APK

### Request

```
POST /upload
Content-Type: multipart/form-data
```

| Field | Type   | Description        |
|-------|--------|--------------------|
| file  | binary | The .apk file blob |

### Response `201 Created`

```json
{
  "status": "success",
  "message": "APK uploaded successfully.",
  "metadata": {
    "upload_id": "<uuid>",
    "original_filename": "app.apk",
    "saved_filename": "<uuid>.apk",
    "saved_path": "uploads/<uuid>.apk",
    "file_size": 4194304,
    "upload_time": "2026-08-12T00:00:00Z"
  },
  "ready_for_analysis": true
}
```

### Error `400 Bad Request`

Triggered when file extension is not `.apk`, file is empty, or file exceeds 100 MB.

```json
{
  "detail": ["Invalid file extension. Only .apk files are allowed."]
}
```

---

## Step 2 — Analyze APK

### Request

```
POST /analyze
Content-Type: application/json
```

```json
{
  "saved_path": "uploads/<uuid>.apk"
}
```

The `saved_path` value is taken directly from the `metadata.saved_path` field
returned by `POST /upload`.

### Response `200 OK`

```json
{
  "status": "success",
  "message": "APK analyzed successfully.",
  "result": {
    "analysis": { },
    "risk": {
      "findings": [
        {
          "rule_id": "MAN-001",
          "title": "Debuggable Application",
          "severity": "HIGH",
          "description": "android:debuggable is set to true.",
          "category": "Manifest",
          "evidence": { }
        }
      ],
      "risk_score": 72,
      "risk_level": "high"
    },
    "ai": {
      "executive_summary": "This application contains several security findings...",
      "overall_risk_assessment": "The application has a HIGH overall risk level...",
      "findings": [
        {
          "rule_id": "MAN-001",
          "explanation": "The application is built with debugging enabled.",
          "security_impact": "Debuggable applications expose additional attack surfaces.",
          "recommendation": "Disable android:debuggable before publishing."
        }
      ]
    }
  }
}
```

### Error `400 Bad Request`

Triggered when the APK cannot be loaded or analysed.

```json
{
  "detail": "<error message from backend>"
}
```

---

## Field Notes

| Field | Notes |
|---|---|
| `risk.findings[].severity` | UPPER_CASE string: `"CRITICAL"`, `"HIGH"`, `"MEDIUM"`, `"LOW"` |
| `risk.findings[].recommendation` | **Not present** in Risk Engine output. Per-finding recommendations come from `ai.findings[].recommendation`. |
| `ai` | Populated by the configured AI provider (`mock` by default). |
| `analysis` | Raw parser output. Shape varies by APK. Not consumed by the frontend dashboard. |
| `metadata.saved_path` | Relative OS path on the backend server. Treat as opaque. |

---

## Frontend Upload Flow

```
User selects .apk
      ↓
POST /upload   (multipart, field: file)
      ↓
metadata.saved_path
      ↓
POST /analyze  (JSON, field: saved_path)
      ↓
result  →  analysis.adapter.ts  →  AnalysisResult
      ↓
Zustand store
      ↓
Dashboard / Findings / AI Report
```