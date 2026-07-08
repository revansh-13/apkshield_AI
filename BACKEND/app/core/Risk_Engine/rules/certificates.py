#Certifcates RULES 
from datetime import datetime, timezone
from app.core.Risk_Engine.findings import (
    SEVERITY_LOW,
    create_finding,
    SEVERITY_HIGH,
    SEVERITY_MEDIUM,
)
from app.core.Risk_Engine.weights import (
    RULE_EXPIRED_CERTIFICATE,
    RULE_DEBUG_CERTIFICATE,
    RULE_SHA1_CERTIFICATE,
    RULE_SELF_SIGNED_CERTIFICATE,
)


def _evaluate_expired_certificate(certificate: dict) -> dict | None:
    """
    Detect expired certificates.

    Args:
        certificate: Parsed certificate record.

    Returns:
        Finding if the certificate has expired, otherwise None.
    """

    current_time = datetime.now(timezone.utc)
    valid_to = certificate.get("valid_to")
    if valid_to >= current_time:
        return None

    return create_finding(
        rule_id=RULE_EXPIRED_CERTIFICATE,
        title="Expired Certificate",
        severity=SEVERITY_HIGH,
        description="The APK is signed with an expired certificate.",
        category="Certificates",
        evidence={
            "valid_to": valid_to,
            "subject": certificate["subject"],
        },
    )


def _evaluate_debug_certificate(certificate:dict) -> dict | None:
    """
    Detect debug certificates.

    Args:
        certificate: Parsed certificate record.

    Returns:
        Finding if the certificate is a debug certificate, otherwise None.
    """

    subject = certificate.get("subject", {})
    common_name = subject.get("common_name")
    if common_name != "Android Debug":
        return None

    return create_finding(
        rule_id=RULE_DEBUG_CERTIFICATE,
        title="Debug Certificate",
        severity=SEVERITY_HIGH,
        description="The APK is signed with a debug certificate.",
        category="Certificates",
        evidence={
            "common_name": common_name,
        },
    )


def _evaluate_sha1_certificate(certificate: dict) -> dict | None:
    """
    Detect SHA-1 signed certificates.

    Args:
        certificate: Parsed certificate record.

    Returns:
        Finding if the certificate is signed with SHA-1, otherwise None.
    """

    hash_algorithm = certificate.get("hash_algorithm")
    if hash_algorithm != "sha1":
        return None

    return create_finding(
        rule_id=RULE_SHA1_CERTIFICATE,
        title="SHA-1 Signed Certificate",
        severity=SEVERITY_MEDIUM,
        description="The APK is signed with a certificate using the weak SHA-1 algorithm.",
        category="Certificates",
        evidence={
            "hash_algorithm": hash_algorithm,
        },
    )

def _evaluate_self_signed_certificate(certificate: dict) -> dict | None:
    """
    Detect self-signed certificates.

    Args:
        certificate: Parsed certificate record.

    Returns:
        Finding if the certificate is self-signed, otherwise None.
    """

    issuer = certificate.get("issuer", {})
    subject = certificate.get("subject", {})
    if issuer != subject:
        return None

    return create_finding(
        rule_id=RULE_SELF_SIGNED_CERTIFICATE,
        title="Self-Signed Certificate",
        severity=SEVERITY_LOW,
        description="The APK is signed with a self-signed certificate.",
        category="Certificates",
        evidence={
            "common_name": subject.get("common_name"),       },
    )


#
# RULES REGISTRY.
#
CERTIFICATE_RULES = [
    _evaluate_expired_certificate,
    _evaluate_debug_certificate,
    _evaluate_sha1_certificate,
    _evaluate_self_signed_certificate,
]

__all__ = [
    "CERTIFICATE_RULES",
]