from app.core.AI.formatter import format_risk_report


risk_report = {
    "findings": [
        {
            "rule_id": "CERT-002",
            "title": "Debug Certificate",
            "severity": "HIGH",
            "description": "The APK is signed with a debug certificate.",
            "category": "Certificates",
            "evidence": {
                "common_name": "Android Debug",
            },
        },
        {
            "rule_id": "MAN-001",
            "title": "Debuggable Application",
            "severity": "HIGH",
            "description": "The application is debuggable.",
            "category": "Manifest",
            "evidence": {
                "debuggable": True,
            },
        },
    ],
    "risk_score": 70,
    "risk_level": "HIGH",
}


formatted = format_risk_report(risk_report)

print(formatted)