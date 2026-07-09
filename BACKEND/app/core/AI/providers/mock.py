"""
Mock AI provider.

Used for local development and testing without an external AI provider.
"""


def generate_completion(
    system_prompt: str,
    user_prompt: str,
) -> dict:
    """
    Generate a mock AI response.

    Args:
        system_prompt: AI system instructions.
        user_prompt: Formatted risk report.

    Returns:
        Mock AI response.
    """

    return {
        "executive_summary": (
            "This application contains several security findings "
            "that should be reviewed before production deployment."
        ),
        "overall_risk_assessment": (
            "The application has a HIGH overall risk level based on "
            "the detected findings."
        ),
        "findings": [
            {
                "rule_id": "MAN-001",
                "explanation": (
                    "The application is built with debugging enabled."
                ),
                "security_impact": (
                    "Debuggable applications expose additional attack "
                    "surfaces and should not be released."
                ),
                "recommendation": (
                    "Disable android:debuggable before publishing "
                    "the application."
                ),
            }
        ],
    }