"""
APK analysis service.

Coordinates the APK loading, parsing and risk evaluation workflow.
"""

from app.core.parsers import (
    load_apk,
    parse_apk,
)

from app.core.Risk_Engine import (
    calculate_risk,
)


def analyze_apk(saved_path: str) -> dict:
    """
    Perform a complete APK analysis.

    Args:
        saved_path: Path to the uploaded APK.

    Returns:
        Complete APK analysis result.
    """

    apk_objects = load_apk(saved_path)
    if not apk_objects["success"]:
        return apk_objects

    parser_output = parse_apk(apk_objects)

    risk_report = calculate_risk(parser_output)
    

    return {
        "analysis": parser_output,
        "risk": risk_report,
    }