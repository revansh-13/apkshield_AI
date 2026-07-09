"""
AI formatter.

Converts Risk Engine output into a standardized structure
for the AI Explanation Engine.
"""


# ============================================================================
# Internal Helpers
# ============================================================================

def _format_finding(finding: dict) -> dict:
    """
    Format a single finding.
    """

    return {
        "rule_id": finding["rule_id"],
        "title": finding["title"],
        "severity": finding["severity"],
        "category": finding["category"],
        "description": finding["description"],
        "evidence": finding["evidence"],
    }


# ============================================================================
# Public API
# ============================================================================

def format_risk_report(risk_report: dict) -> dict:
    """
    Format a Risk Engine report for AI processing.

    Args:
        risk_report: Output from the Risk Engine.

    Returns:
        Standardized AI input.
    """

    findings = [
        _format_finding(finding)
        for finding in risk_report["findings"]
    ]

    return {
        "risk_score": risk_report["risk_score"],
        "risk_level": risk_report["risk_level"],
        "finding_count": len(findings),
        "findings": findings,
    }