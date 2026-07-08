"""
Manifest security rules.
"""

from app.core.Risk_Engine.findings import (
    create_finding,
    SEVERITY_HIGH,
    SEVERITY_MEDIUM,
)

from app.core.Risk_Engine.weights import (
    RULE_DEBUGGABLE_APPLICATION,
    RULE_ALLOW_BACKUP_ENABLED,
    RULE_MISSING_TARGET_SDK,
)


# ============================================================================
# Individual Rules
# ============================================================================

def _evaluate_debuggable_application(manifest: dict) -> dict | None:
    """
    Detect debuggable applications.

    Args:
        manifest: Parsed manifest information.

    Returns:
        Finding if the application is debuggable, otherwise None.
    """

    debuggable = manifest.get("debuggable")

    if debuggable is not True:
        return None

    return create_finding(
        rule_id=RULE_DEBUGGABLE_APPLICATION,
        title="Debuggable Application",
        severity=SEVERITY_HIGH,
        description="The application is debuggable, which should not be enabled in production builds.",
        category="Manifest",
        evidence={
            "debuggable": debuggable,
        },
    )


def _evaluate_allow_backup_enabled(manifest: dict) -> dict | None:
    """
    Detect applications that allow backup.

    Args:
        manifest: Parsed manifest information.

    Returns:
        Finding if the application allows backup, otherwise None.
    """

    allow_backup = manifest.get("allow_backup")

    if allow_backup is not True:
        return None

    return create_finding(
        rule_id=RULE_ALLOW_BACKUP_ENABLED,
        title="Allow Backup Enabled",
        severity=SEVERITY_MEDIUM,
        description="The application allows backup, which may expose sensitive data.",
        category="Manifest",
        evidence={
            "allow_backup": True,
        },
    )


def _evaluate_missing_target_sdk(manifest: dict) -> dict | None:
    """
    Detect applications that do not specify a target SDK version.

    Args:
        manifest: Parsed manifest information.

    Returns:
        Finding if the application is missing a target SDK version, otherwise None.
    """

    target_sdk = manifest.get("target_sdk")

    if target_sdk is not None:
        return None

    return create_finding(
        rule_id=RULE_MISSING_TARGET_SDK,
        title="Missing Target SDK Version",
        severity=SEVERITY_MEDIUM,
        description="The application does not specify a target SDK version, which may lead to compatibility issues.",
        category="Manifest",
        evidence={
            "target_sdk": None,
        },
    )

# ============================================================================
# Rule Registry
# ============================================================================

MANIFEST_RULES = [
    _evaluate_debuggable_application,
    _evaluate_allow_backup_enabled,
    _evaluate_missing_target_sdk,
]


# ============================================================================
# Public API
# ============================================================================

__all__ = [
    "MANIFEST_RULES",
]