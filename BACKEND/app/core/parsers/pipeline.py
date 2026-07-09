"""
Parser pipeline responsible for executing all APK parsers.
"""

import time
from .manifest import parse_manifest
from .permissions import parse_permissions
from .components import parse_components
from .urls import parse_urls
from .certificates import parse_certificates
from .strings import parse_strings


# ============================================================================
# Parser Input Constants
# ============================================================================

INPUT_APK = "apk"
INPUT_ANALYSIS = "analysis"
INPUT_DEX = "dex"


# ============================================================================
# Parser Registry
# ============================================================================

PARSERS_REGISTRY = {
    "manifest": {
        "parser": parse_manifest,
        "input": INPUT_APK,
    },
    "permissions": {
        "parser": parse_permissions,
        "input": INPUT_APK,
    },
    "components": {
        "parser": parse_components,
        "input": INPUT_APK,
    },
    "urls": {
        "parser": parse_urls,
        "input": INPUT_ANALYSIS,
    },
    "certificates": {
        "parser": parse_certificates,
        "input": INPUT_APK,
    },
    "strings": {
        "parser": parse_strings,
        "input": INPUT_DEX
    }
}


# ============================================================================
# Internal Helpers
# ============================================================================

def _run_parser(parser_function, parser_input) -> dict:
    """
    Execute a parser safely and return a standardized parser result.
    """
    start_time = time.perf_counter()

    try:
        parser_output = parser_function(parser_input)

        execution_time = (time.perf_counter() - start_time) * 1000

        return {
            "success": True,
            "data": parser_output,
            "error": None,
            "execution_time": round(execution_time, 2),
        }

    except Exception as error:

        import traceback
        traceback.print_exc()
        execution_time = (time.perf_counter() - start_time) * 1000

        return {
            "success": False,
            "data": None,
            "error": str(error),
            "execution_time": round(execution_time, 2),
        }


# ============================================================================
# Public API
# ============================================================================

def parse_apk(loader_result: dict) -> dict:
    """
    Execute all registered APK parsers and combine their outputs.

    Args:
        loader_result: Dictionary returned by load_apk().

    Returns:
        dict: Combined parser results.
    """
    parser_output = {}

    for parser_name, parser_config in PARSERS_REGISTRY.items():

        parser_function = parser_config["parser"]
        parser_input = loader_result[parser_config["input"]]

        parser_result = _run_parser(
        parser_function,
        parser_input,
        )
        

        parser_output[parser_name] = parser_result["data"]

    return parser_output