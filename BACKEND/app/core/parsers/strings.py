"""
DEX string parser.
"""

import re


# ============================================================================
# Internal Helpers
# ============================================================================

def _create_collection(items):
    """
    Create a standardized string collection.
    """

    unique_items = sorted(set(items))

    return {
        "items": unique_items,
        "count": len(items),
        "unique_count": len(unique_items),
    }


def _extract_strings(dex_files):
    """
    Extract printable strings from all DEX files.
    """

    strings = []

    for dex in dex_files:

        for value in dex.get_strings():

            if not value:
                continue

            value = value.strip()

            if not value:
                continue

            strings.append(value)

    return strings


# ============================================================================
# Public API
# ============================================================================

def parse_strings(dex_files):
    """
    Extract strings from every DEX file.
    """

    strings = _extract_strings(dex_files)

    return {
        "strings": _create_collection(strings),
    }