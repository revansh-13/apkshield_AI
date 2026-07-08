#Extract well-formed URI/URL artifacts from the Androguard analysis object and return a standardized report.
from urllib.parse import urlparse
import re


_SUPPORTED_URI_SCHEMES = {
    "http",
    "https",
    "ftp",
    "mailto",
    "content",
    "file",
    "intent",
    "market",
}

_URI_PATTERN = re.compile(r"^[a-zA-Z][a-zA-Z0-9+.-]*:")

def _create_url_record(url: str) -> dict:
    """
    Create a standardized URL record from a single URI string.
    """
    parsed = urlparse(url)

    return {
        "url": url,
        "scheme": parsed.scheme,
        "host": parsed.hostname,
        "port": parsed.port,
        "path": parsed.path or None,
        "query": parsed.query or None,
        "fragment": parsed.fragment or None,
        "source": "string",
    }

def _extract_uris(analysis) -> list[str]:
    """
    Extract well-formed URI/URL strings from the Androguard analysis object.
    """
    string_analysis = analysis.get_strings_analysis()
    uris = []

    for string in string_analysis:
        if not _URI_PATTERN.match(string):
            continue

        parsed = urlparse(string)

        if parsed.scheme.lower() not in _SUPPORTED_URI_SCHEMES:
            continue

        uris.append(string)

    return uris

def _create_url_collection(uris: list[str]) -> dict:
    """
    Create a standardized URL collection.
    """
    url_records = [_create_url_record(uri) for uri in uris]

    return {
        "urls": url_records,
        "total_count": len(url_records),
        "unique_count": len(set(uris)),
    }

def parse_urls(analysis) -> dict:
    """
    Parse URI/URL information from the APK analysis object.
    """
    uris = _extract_uris(analysis)

    return _create_url_collection(uris)