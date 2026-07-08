"""
URL security evaluator.

Evaluates parsed URL records against security rules and generates
standardized findings.
"""

from app.core.Risk_Engine.evaluator import run_rules
from app.core.Risk_Engine.rules.urls import URL_RULES

def evaluate_urls(url_data: dict) -> list[dict]:
    """
    Evaluate all parsed URLs.

    Args:
        url_data: Output of the URL parser.

    Returns:
        List of generated findings.
    """

    findings = []

    for url_record in url_data["urls"]:
        findings.extend(
            run_rules(
                item=url_record,
                rules=URL_RULES,
            )
        )    

    return findings