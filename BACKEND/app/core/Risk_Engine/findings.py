"""
Utilities for creating standardized risk findings.

This module defines the shared finding structure used throughout the
Risk Engine. Every evaluator should use `create_finding()` to ensure
all findings follow the same contract.
"""
from typing import Any

# Severity Constants
SEVERITY_LOW = "LOW"
SEVERITY_MEDIUM = "MEDIUM"
SEVERITY_HIGH = "HIGH"
SEVERITY_CRITICAL = "CRITICAL"


def create_finding(
    *,
    rule_id: str,
    title: str,
    severity: str,
    description: str,
    category: str,
    evidence: dict[str, Any],
) -> dict:
    """
    Create a standardized risk finding.

    Args:
        rule_id: Unique identifier for the detection rule.
        title: Short human-readable finding title.
        severity: Finding severity.
        description: Explanation of the finding.
        category: Category that produced the finding.
        evidence: Structured evidence supporting the finding.

    Returns:
        Standardized finding dictionary.
    """

    return {
        "rule_id": rule_id,
        "title": title,
        "severity": severity,
        "description": description,
        "category": category,
        "evidence": evidence,
    }