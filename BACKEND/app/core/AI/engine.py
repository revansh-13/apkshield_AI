"""
AI Explanation Engine.
"""

import json

from app.core.AI.formatter import format_risk_report
from app.core.AI.prompt import SYSTEM_PROMPT
from app.core.AI.client import generate_completion


# ============================================================================
# Public API
# ============================================================================

def generate_ai_report(risk_report: dict) -> dict:
    """
    Generate an AI explanation for a Risk Engine report.

    Args:
        risk_report: Output from the Risk Engine.

    Returns:
        AI-generated explanation.
    """

    formatted_report = format_risk_report(risk_report)

    response = generate_completion(
        system_prompt=SYSTEM_PROMPT,
        user_prompt=json.dumps(
            formatted_report,
            indent=2,
        ),
    )

    return response