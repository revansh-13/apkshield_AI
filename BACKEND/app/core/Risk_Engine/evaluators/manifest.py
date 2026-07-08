"""
Manifest security evaluator.

Evaluates parsed manifest data against security rules and
generates standardized findings.
"""

from app.core.Risk_Engine.evaluator import run_rules
from app.core.Risk_Engine.rules.manifest import MANIFEST_RULES


# ============================================================================
# Public API
# ============================================================================

def evaluate_manifest(manifest_data: dict) -> list[dict]:
    """
    Evaluate parsed manifest information.

    Args:
        manifest_data: Output of the manifest parser.

    Returns:
        List of generated findings.
    """

    return run_rules(
        item=manifest_data,
        rules=MANIFEST_RULES,
    )