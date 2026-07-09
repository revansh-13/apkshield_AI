"""
Android component security evaluator.

Evaluates parsed Android components against security rules and
generates standardized findings.
"""

from app.core.Risk_Engine.evaluator import run_rules
from app.core.Risk_Engine.rules.components import COMPONENT_RULES


def evaluate_components(components_data: dict) -> list[dict]:
    """
    Evaluate all parsed Android components.

    Args:
        components_data: Output from the components parser.

    Returns:
        List of generated findings.
    """

    findings = []

    for component_group in (
        "activities",
        "services",
        "receivers",
        "providers",
    ):

        for component in components_data[component_group]["items"]:

            findings.extend(
                run_rules(
                    item=component,
                    rules=COMPONENT_RULES,
                )
            )

    return findings