from app.android.permissions import get_permission_record, get_short_permission_name

def _build_permission_record(permission_name: str) -> dict:
    """
    Convert a raw Android permission into APKShield's
    standardized permission record.
    """

    permission_info = get_permission_record(permission_name)

    short_name = get_short_permission_name(permission_name)

    return {
        "name": permission_name,
        "short_name": short_name,
        "protection_level": permission_info["protection_level"],
        "group": permission_info["group"]
    }
   


def parse_permissions(apk):
    """
    Extract all permissions requested by the APK.
    """
    
    raw_permissions = apk.get_permissions()

    permissions = []

    for permission in raw_permissions:
        permissions.append(
            _build_permission_record(permission)
        )

    return {
        "permissions": permissions,
        "total_count": len(raw_permissions),
        "unique_count": len(set(raw_permissions))
    }  