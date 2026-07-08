from .weights import get_weight
def calculate_score(findings)-> int:
    """
    Calculate the overall risk score based on the provided findings.

    Args:
        findings: List of standardized risk findings.

    Returns:
        Overall risk score as an integer.
    """
    total_score = 0

    for finding in findings:
        rule_id = finding["rule_id"]
        weight= get_weight(rule_id)
        total_score += weight

    return total_score