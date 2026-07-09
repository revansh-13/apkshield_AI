"""
String security rules.
"""

import re

from app.core.Risk_Engine.findings import (
    create_finding,
    SEVERITY_HIGH,
    SEVERITY_MEDIUM
)

from app.core.Risk_Engine.weights import (
    RULE_GOOGLE_API_KEY,
    RULE_AWS_ACCESS_KEY,
    RULE_JWT_TOKEN,
    RULE_FIREBASE_URL,
    RULE_GENERIC_SECRET,

)


GOOGLE_API_KEY_PATTERN = re.compile(
    r"AIza[0-9A-Za-z\-_]{35}"
)
AWS_ACCESS_KEY_PATTERN = re.compile(
    r"AKIA[0-9A-Z]{16}"
)
JWT_PATTERN = re.compile(
    r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+"
)
FIREBASE_URL_PATTERN = re.compile(
    r"https://[a-zA-Z0-9\-]+\.firebaseio\.com(?:/.*)?"
)
GENERIC_SECRET_PATTERN = re.compile(
    r"\b[A-Za-z0-9_\-]{32,}\b"
)







def _evaluate_google_api_key(string: str) -> dict | None:
    """
    Detect hardcoded Google API keys.
    """

    if not GOOGLE_API_KEY_PATTERN.fullmatch(string):
        return None

    return create_finding(
        rule_id=RULE_GOOGLE_API_KEY,
        title="Hardcoded Google API Key",
        severity=SEVERITY_HIGH,
        description="A Google API key was found inside the APK.",
        category="Strings",
        evidence={
            "value": string,
        },
    )




def _evaluate_aws_access_key(string: str) -> dict | None:
    """
    Detect hardcoded AWS Access Keys.
    """

    if not AWS_ACCESS_KEY_PATTERN.fullmatch(string):
        return None

    return create_finding(
        rule_id=RULE_AWS_ACCESS_KEY,
        title="Hardcoded AWS Access Key",
        severity=SEVERITY_HIGH,
        description="An AWS Access Key was found inside the APK.",
        category="Strings",
        evidence={
            "value": string,
        },
    )

def _evaluate_jwt_token(string: str) -> dict | None:
    """
    Detect hardcoded JWT tokens.
    """

    if not JWT_PATTERN.search(string):
        return None

    return create_finding(
        rule_id=RULE_JWT_TOKEN,
        title="Hardcoded JWT Token",
        severity=SEVERITY_HIGH,
        description="A JWT token was found inside the APK.",
        category="Strings",
        evidence={
            "value": string,
        },
    )

def _evaluate_firebase_url(string: str) -> dict | None:
    """
    Detect Firebase Realtime Database URLs.
    """

    match = FIREBASE_URL_PATTERN.search(string)

    if match is None:
        return None

    return create_finding(
        rule_id=RULE_FIREBASE_URL,
        title="Firebase Database URL",
        severity=SEVERITY_MEDIUM,
        description="A Firebase Realtime Database URL was found inside the APK.",
        category="Strings",
        evidence={
            "value": match.group(0),
        },
    )

def _evaluate_generic_secret(string:str) -> dict | None:

    IGNORED_PREFIXES = (
        "android.",
        "androidx.",
        "java.",
        "javax.",
        "kotlin.",
        "com.google.",
    )

    match = GENERIC_SECRET_PATTERN.search(string)

    if match is None:
        return None

    secret = match.group(0)

    for prefix in IGNORED_PREFIXES:
        if secret.startswith(prefix):
            return None

    return create_finding(
    rule_id=RULE_GENERIC_SECRET,
    title="Potential Hardcoded Secret",
    severity=SEVERITY_MEDIUM,
    description="A high-entropy string that may contain a hardcoded secret was found.",
    category="Strings",
    evidence={
        "value": secret,
    },
)    




#
# RULES REGISTRY.
#
STRING_RULES = [
    _evaluate_google_api_key,
    _evaluate_aws_access_key,
    _evaluate_jwt_token,
    _evaluate_firebase_url,
    _evaluate_generic_secret,

]

__all__ = [
    "STRING_RULES",
]