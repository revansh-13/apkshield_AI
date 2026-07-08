"""
Risk level classification.

Maps a calculated risk score to a human-readable risk level.
"""

RISK_LEVEL_LOW = "LOW"
RISK_LEVEL_MEDIUM = "MEDIUM"
RISK_LEVEL_HIGH = "HIGH"
RISK_LEVEL_CRITICAL = "CRITICAL"


def calculate_risk_level(score: int) -> str:
    """
    Calculate the overall risk level for a given score.

    Args:
        score: Total calculated risk score.

    Returns:
        Risk level.
    """

    if score >= 75:
        return RISK_LEVEL_CRITICAL

    if score >= 50:
        return RISK_LEVEL_HIGH

    if score >= 25:
        return RISK_LEVEL_MEDIUM

    return RISK_LEVEL_LOW