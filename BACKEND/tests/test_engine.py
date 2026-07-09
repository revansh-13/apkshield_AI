from app.core.AI.engine import generate_ai_report


risk_report = {
    "risk_score": 70,
    "risk_level": "HIGH",
    "findings": [
        {
            "rule_id": "MAN-001",
            "title": "Debuggable Application",
            "severity": "HIGH",
            "description": "The application is debuggable.",
            "category": "Manifest",
            "evidence": {
                "debuggable": True,
            },
        }
    ],
}

response = generate_ai_report(risk_report)

print(response)