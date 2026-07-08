"""
Certificate security evaluator.
Evaluates parsed certificate records against security rules and
generates standardized findings.
"""


from app.core.Risk_Engine.evaluator import run_rules
from app.core.Risk_Engine.rules.certificates import CERTIFICATE_RULES

def evaluate_certificates(certificates_data: dict) -> list[dict]:
    """
    Evaluate all parsed certificates.

    Args:
        certificates_data: Output from the certificate parser.

    Returns:
        List of generated findings.
    """

    findings = []

    for certificate in certificates_data["certificates"]:
        findings.extend(
            run_rules(
                item=certificate,
                rules=CERTIFICATE_RULES,
            )
        )

    return findings
