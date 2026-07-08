"""
Permission security evaluator.

Evaluates parsed Android permissions against APKShield AI's
permission security policy.
"""

from app.core.Risk_Engine.findings import create_finding

from app.core.Risk_Engine.rules.permissions import (
    get_permission_rule,
)

_CATEGORY = "Permissions"
def evaluate_permissions(permission_data):
    """
    Evaluate parsed permissions.

    Args:
        permission_data: Output from the permission parser.

    Returns:
        List of generated findings.
    """

    findings = []

    for permission in permission_data["permissions"]:

        permission_name = permission["name"]

        rule = get_permission_rule(permission_name)

        if rule is None:
            continue

        rule_id = rule["rule_id"]
        title = rule["title"]
        severity = rule["severity"]
        description = rule["description"]

        finding = create_finding(
            rule_id=rule_id,
            title=title,
            severity=severity,
            description=description,
            category=_CATEGORY,
            evidence={
                "permission": permission_name,
            },
        )

        findings.append(finding)

    return findings
