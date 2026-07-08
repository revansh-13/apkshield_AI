from app.core.Risk_Engine.findings import (
    create_finding,
    SEVERITY_MEDIUM,
    SEVERITY_LOW
)
from app.core.Risk_Engine.weights import (
    RULE_HTTP_URL,
    RULE_IP_ADDRESS_URL,
    RULE_LOCALHOST_URL,
    RULE_PRIVATE_NETWORK_URL,
    RULE_SHORTENER_URL,
)
import ipaddress

# ============================================================================
# Internal Helpers
# ============================================================================

def _is_ip_address(host: str | None) -> bool:
    """
    Check whether the host is a valid IP address.
    """

    if host is None:
        return False

    try:
        ipaddress.ip_address(host)
        return True
    except ValueError:
        return False
    
def _is_private_ip(host: str | None) -> bool:
    """
    Check whether the host is a private IP address.
    """

    if not _is_ip_address(host):
        return False

    return ipaddress.ip_address(host).is_private

def _is_localhost(host: str | None) -> bool:
    """
    Check whether the host refers to localhost.
    """

    if host is None:
        return False

    if host.lower() == "localhost":
        return True

    if not _is_ip_address(host):
        return False

    return ipaddress.ip_address(host).is_loopback

_KNOWN_URL_SHORTNERS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "is.gd",
    "ow.ly",
    "buff.ly",
}
def _is_url_shortener(host: str |None) -> bool:
    """
    Check whether the host belongs to a known URL shortening service.
    """

    if host is None:
        return False

    return host.lower() in _KNOWN_URL_SHORTNERS 



# ============================================================================
# Rules
# ============================================================================

def _evaluate_http_urls(url_record: dict) -> dict | None:
    """
    Detect insecure HTTP URLs.

    Args:
        url_record: Parsed URL record.

    Returns:
        Finding if the URL uses HTTP, otherwise None.
    """

    if url_record.get("scheme") != "http":
        return None

    return create_finding(
        rule_id=RULE_HTTP_URL,
        title="Insecure HTTP URL",
        severity=SEVERITY_MEDIUM,
        description="The application contains an HTTP URL which is transmitted without encryption.",
        category="URLs",
        evidence={
            "url": url_record["url"],
        },
    )

def _evaluate_ip_address_rule(url_record: dict) -> dict | None:
    """
    Detect URLs that use a raw IP address instead of a domain.
    """

    host = url_record.get("host")

    if not _is_ip_address(host):
        return None

    return create_finding(
        rule_id=RULE_IP_ADDRESS_URL,
        title="Raw IP Address URL",
        severity=SEVERITY_MEDIUM,
        description="The application contains a URL that uses a raw IP address instead of a domain name.",
        category="URLs",
        evidence={
            "host": host,
        },
    )

def _evaluate_localhost_rule(url_record: dict) -> dict | None:
    """
    Detect localhost URLs.
    """

    host = url_record.get("host")

    if not _is_localhost(host):
        return None

    return create_finding(
        rule_id=RULE_LOCALHOST_URL,
        title="Localhost URL",
        severity=SEVERITY_LOW,
        description="The application references a localhost address, which is typically used for development or testing.",
        category="URLs",
        evidence={
            "host": host,
        },
    )

def _evaluate_private_network_rule(url_record: dict) -> dict | None:
    """
    Detect private network IP addresses.
    """

    host = url_record.get("host")

    if not _is_private_ip(host):
        return None

    return create_finding(
        rule_id=RULE_PRIVATE_NETWORK_URL,
        title="Private Network URL",
        severity=SEVERITY_LOW,
        description="The application references a private network IP address.",
        category="URLs",
        evidence={
            "host": host,
        },
    )

def _evaluate_url_shortener_rule(url_record: dict) -> dict | None:
    """
    Detect known URL shortening services.
    """

    host = url_record.get("host")

    if not _is_url_shortener(host):
        return None

    return create_finding(
        rule_id=RULE_SHORTENER_URL,
        title="URL Shortener",
        severity=SEVERITY_LOW,
        description="The application references a known URL shortening service, which may obscure the final destination.",
        category="URLs",
        evidence={
            "host": host,
        },
    )

#=============================================================================
# RULES REGISTRY.
#============================================================================
URL_RULES = [
    _evaluate_http_urls,
    _evaluate_ip_address_rule,
    _evaluate_localhost_rule,
    _evaluate_private_network_rule,
    _evaluate_url_shortener_rule
]

__all__ = [
    "URL_RULES",
]
