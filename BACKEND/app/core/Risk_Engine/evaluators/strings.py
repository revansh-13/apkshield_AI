"""
String security evaluator.
"""

from app.core.Risk_Engine.evaluator import run_rules
from app.core.Risk_Engine.rules.strings import STRING_RULES


def evaluate_strings(strings_data: dict) -> list[dict]:
    """
    Evaluate extracted strings.
    """

    findings = []

    for string in strings_data["strings"]["items"]:

        findings.extend(
            run_rules(
                item=string,
                rules=STRING_RULES,
            )
        )

    return findings