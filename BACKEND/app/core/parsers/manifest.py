from email.mime import application

from app.utils.converters import safe_int
ANDROID_NAMESPACE = "{http://schemas.android.com/apk/res/android}"

def _get_bool_attribute(application, attribute_name):
    """
    Extract a boolean Android manifest attribute.

    Returns:
        True  -> attribute="true"
        False -> attribute="false"
        None  -> attribute not present
    """

    value = application.attrib.get(
        f"{ANDROID_NAMESPACE}{attribute_name}"
    )

    if value is None:
        return None

    return value.lower() == "true"



def parse_manifest(apk):
    """
    Extract manifest information from an APK object.
    """
    # print([method for method in dir(apk) if "debug" in method.lower()])
    # print([method for method in dir(apk) if "backup" in method.lower()])
    manifest = apk.get_android_manifest_xml()

    application = manifest.find("application")

    if application is None:
        raise ValueError("Application element not found in AndroidManifest.xml")
    

    package_name = apk.get_package()
    app_name = apk.get_app_name()

    version_name = apk.get_androidversion_name()
    version_code = safe_int(apk.get_androidversion_code())

    min_sdk = safe_int(apk.get_min_sdk_version())
    target_sdk = safe_int(apk.get_target_sdk_version())

    debuggable = _get_bool_attribute(application, "debuggable")
    allow_backup = _get_bool_attribute(application, "allowBackup")

    return {
        "package_name": package_name,
        "app_name": app_name,
        "version_name": version_name,
        "version_code": version_code,
        "min_sdk": min_sdk,
        "target_sdk": target_sdk,
        "debuggable": debuggable,
        "allow_backup": allow_backup,
    }