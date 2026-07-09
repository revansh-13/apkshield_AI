"""
Android component security rules.
"""

from app.core.Risk_Engine.findings import (
    create_finding,
    SEVERITY_LOW,
    SEVERITY_MEDIUM,
    SEVERITY_HIGH,
)

from app.core.Risk_Engine.weights import (
    RULE_EXPORTED_ACTIVITY,
    RULE_EXPORTED_SERVICE,
    RULE_EXPORTED_PROVIDER,
    RULE_EXPORTED_NO_PERMISSION,
    RULE_EXPORTED_RECEIVER
   

)


def _evaluate_exported_activity(component: dict) -> dict | None:
    """
    Detect exported Android activities.

    Args:
        component: Parsed Android component.

    Returns:
        Finding if the activity is exported, otherwise None.
    """
   
    # Only evaluate activities.
    if component.get("type") != "activity":
        return None

    # Activity is not exported.
    if component.get("exported") is not True:
        return None

    return create_finding(
        rule_id=RULE_EXPORTED_ACTIVITY,
        title="Exported Activity",
        severity=SEVERITY_LOW,
        description="The application exposes an exported activity.",
        category="Components",
        evidence={
            "component": component["name"],
        },
    )  

def _evaluate_exported_service(component: dict) -> dict | None:
    """
    Detect exported Android services.
    """

    if component.get("type") != "service":
        return None

    if component.get("exported") is not True:
        return None

    return create_finding(
        rule_id=RULE_EXPORTED_SERVICE,
        title="Exported Service",
        severity=SEVERITY_MEDIUM,
        description="The application exposes an exported service.",
        category="Components",
        evidence={
            "component": component["name"],
        },
    )

def _evaluate_exported_receiver(component: dict) -> dict | None:
    """
    Detect exported Android broadcast receivers.
    """

    if component.get("type") != "receiver":
        return None

    if component.get("exported") is not True:
        return None

    return create_finding(
        rule_id=RULE_EXPORTED_RECEIVER,
        title="Exported Broadcast Receiver",
        severity=SEVERITY_MEDIUM,
        description="The application exposes an exported broadcast receiver.",
        category="Components",
        evidence={
            "component": component["name"],
        },
    )

def _evaluate_exported_provider(component: dict) -> dict | None:
    """
    Detect exported Android content providers.
    """

    if component.get("type") != "provider":
        return None

    if component.get("exported") is not True:
        return None

    return create_finding(
        rule_id=RULE_EXPORTED_PROVIDER,
        title="Exported Content Provider",
        severity=SEVERITY_HIGH,
        description="The application exposes an exported content provider.",
        category="Components",
        evidence={
            "component": component["name"],
            "authorities": component.get("authorities"),
        },
    )

def _evaluate_exported_without_permission(component: dict) -> dict | None:
    """
    Detect exported components that do not require a permission.
    """

    if component.get("exported") is not True:
        return None

    if component.get("permission") is not None:
        return None

    return create_finding(
        rule_id=RULE_EXPORTED_NO_PERMISSION,
        title="Exported Component Without Permission",
        severity=SEVERITY_HIGH,
        description="The exported component does not require a permission.",
        category="Components",
        evidence={
            "component": component["name"],
            "type": component["type"],
        },
    )

#========================================#
#RULE REGISTRY#
#========================================#
COMPONENT_RULES = [
    _evaluate_exported_activity,
    _evaluate_exported_provider,
    _evaluate_exported_receiver,
    _evaluate_exported_service,
    _evaluate_exported_without_permission
]

#=======================================#
#PUBLIC API#
#======================================#
__all__ = [
    "COMPONENT_RULES",
]