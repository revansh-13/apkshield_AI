from typing import Callable
from typing import Any


def run_rules(
    *,
    item: dict[str, Any],
    rules: list[Callable[[dict[str, Any]], dict | None]],
) -> list[dict]:
    """
    Evaluate a single item against a collection of rules.

    Args:
        item: Parsed record.
        rules: List of rule functions.

    Returns:
        List of generated findings.
    """

    findings = []

    for rule in rules:
        finding = rule(item)

        if finding is not None:
            findings.append(finding)

    return findings