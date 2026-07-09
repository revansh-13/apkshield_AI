"""Risk Engine Pipeline"""
"""
Risk evaluation pipeline.
"""

from uvicorn import Config
from app.core.Risk_Engine.scoring import calculate_score
from app.core.Risk_Engine.evaluators.permission import (
    evaluate_permissions,
)
from app.core.Risk_Engine.evaluators.urls import (
    evaluate_urls,
)
from app.core.Risk_Engine.evaluators.certificates import (
    evaluate_certificates,
)
from app.core.Risk_Engine.evaluators.manifest import (  
    evaluate_manifest,
)
from app.core.Risk_Engine.evaluators.components import(
    evaluate_components
)
from app.core.Risk_Engine.evaluators.strings import(
    evaluate_strings
)

#
# Registry of all risk evaluators.
#
_EVALUATOR_REGISTRY = {

    "permissions": evaluate_permissions,

    "urls": evaluate_urls,

    "certificates": evaluate_certificates,

    "manifest": evaluate_manifest,

    "components": evaluate_components,

    "strings": evaluate_strings,

}


def evaluate_risk(parser_output: dict) -> dict:
    """
    Execute the APKShield AI risk evaluation pipeline.

    Args:
        parser_output: Output from the parser subsystem.

    Returns:
        Evaluation result.
    """

    findings = []

    for parser_name, evaluator in _EVALUATOR_REGISTRY.items():

        parser_data = parser_output[parser_name]

        findings.extend(
            evaluator(parser_data)
        )

    risk_score = calculate_score(findings)

    return {
        "findings": findings,
        "risk_score": risk_score,
    }