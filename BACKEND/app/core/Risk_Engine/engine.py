""""
APK SHEILD AI RISK ENGINE
PUBLIC API for deterministic risk evaluation of Android APKs.
"""

from app.core.Risk_Engine.levels import calculate_risk_level
from app.core.Risk_Engine.pipeline import evaluate_risk   

def calculate_risk(parser_output: dict) ->dict:
    """
    Calculate the overall risk level for a given APK.

    Args:
        parser_output: Output from the parser subsystem.

    Returns:
        Risk evaluation result.    
    """
    evaluation_result=evaluate_risk(parser_output)
    risk_score=evaluation_result["risk_score"]
    risk_level=calculate_risk_level(risk_score)
    return {
        "findings": evaluation_result["findings"],
        "risk_score": risk_score,
        "risk_level": risk_level
    }