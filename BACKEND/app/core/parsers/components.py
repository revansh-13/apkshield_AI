"""
Android components parser.
"""

def _parse_android_bool(value: str | None) -> bool | None:
    """
    Convert Android XML boolean values into Python booleans.

    Args:
        value: Raw XML attribute value.

    Returns:
        True, False or None.
    """

    if value is None:
        return None

    return value.lower() == "true"

ANDROID_NS = "{http://schemas.android.com/apk/res/android}"


# ============================================================================
# Internal Helpers
# ============================================================================

def _create_component_record(
    *,
    name,
    exported=None,
    enabled=None,
    permission=None,
):
    """
    Build a standardized Android component record.
    """

    return {
        "name": name,
        "short_name": name.split(".")[-1],
        "exported": exported,
        "enabled": enabled,
        "permission": permission,
    }

def _normalize_component_name(
    package_name: str,
    component_name: str | None,
) -> str | None:
    """
    Convert an Android component name into its fully-qualified form.

    Examples:
        .MainActivity
            -> com.example.MainActivity

        MainActivity
            -> com.example.MainActivity

        com.example.MainActivity
            -> com.example.MainActivity
    """

    if component_name is None:
        return None

    if component_name.startswith("."):
        return package_name + component_name

    if "." not in component_name:
        return package_name + "." + component_name

    return component_name


def _find_component_element(
    manifest,
    package_name: str,
    tag_name: str,
    component_name: str,
):
    """
    Locate a component element inside AndroidManifest.xml.
    """

    for element in manifest.findall(f".//{tag_name}"):

        manifest_name = element.get(f"{ANDROID_NS}name")

        manifest_name = _normalize_component_name(
            package_name,
            manifest_name,
        )

        if manifest_name == component_name:
            return element

    return None


def _create_component_collection(
    manifest,
    package_name,
    component_names,
    tag_name,
):
    """
    Convert raw Android components into standardized records.
    """

    component_records = []

    for component_name in component_names:

        element = _find_component_element(
            manifest,
            package_name,
            tag_name,
            component_name,
        )

        exported = None
        enabled = None
        permission = None

        if element is not None:

            exported = _parse_android_bool(
                element.get(f"{ANDROID_NS}exported")
            )

            enabled = _parse_android_bool(
                element.get(f"{ANDROID_NS}enabled")
            )

            permission = element.get(f"{ANDROID_NS}permission")

        component_records.append(
            _create_component_record(
                name=component_name,
                exported=exported,
                enabled=enabled,
                permission=permission,
            )
        )

    return component_records


def _create_component_group(component_records):
    """
    Create a standardized component collection.
    """

    return {
        "items": component_records,
        "count": len(component_records),
    }


# ============================================================================
# Public API
# ============================================================================


def parse_components(apk):
    """
    Extract Android component information.
    """
    manifest = apk.get_android_manifest_xml()
    package_name = apk.get_package()

    activities = _create_component_collection(
        manifest,
        package_name,
        apk.get_activities(),
        "activity",
    )

    services = _create_component_collection(
        manifest,
        package_name,
        apk.get_services(),
        "service",
    )

    receivers = _create_component_collection(
        manifest,
        package_name,
        apk.get_receivers(),
        "receiver",
    )

    providers = _create_component_collection(
        manifest,
        package_name,
        apk.get_providers(),
        "provider",
    )

    return {
        "activities": _create_component_group(activities),
        "services": _create_component_group(services),
        "receivers": _create_component_group(receivers),
        "providers": _create_component_group(providers),
    }