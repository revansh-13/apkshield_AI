import json
from pathlib import Path

_PERMISSION_DATABASE = None


def load_permission_database():
    """
    Load Android permission metadata once.
    Uses lazy loading to avoid repeated disk access.
    """

    global _PERMISSION_DATABASE

    if _PERMISSION_DATABASE is None:
        json_path = Path(__file__).parent / "permissions.json"

        with open(json_path, "r", encoding="utf-8") as file:
            _PERMISSION_DATABASE = json.load(file)

    return _PERMISSION_DATABASE


def get_permission_record(permission_name: str) -> dict:
    """
    Retrieve metadata for an Android permission.

    Returns a consistent structure even if the permission
    is unknown.
    """

    database = load_permission_database()

    permission_info = database.get(permission_name)

    if permission_info is None:
        return {
            "protection_level": None,
            "group": None
        }

    return permission_info

def get_short_permission_name(permission_name: str) -> str:
    return permission_name.split(".")[-1]