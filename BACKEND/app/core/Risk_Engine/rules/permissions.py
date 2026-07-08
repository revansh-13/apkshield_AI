from app.core.Risk_Engine.findings import SEVERITY_HIGH, SEVERITY_CRITICAL
from app.core.Risk_Engine.weights import (
    RULE_SEND_SMS,
    RULE_READ_SMS,
    RULE_RECEIVE_SMS,
    RULE_READ_CONTACTS,
    RULE_RECORD_AUDIO,
    RULE_SYSTEM_ALERT_WINDOW,
    RULE_REQUEST_INSTALL_PACKAGES,
)

_PERMISSIONS_RULES = {
    "android.permissions.SEND_SMS":{
        "rule_id":RULE_SEND_SMS,
        "severity":SEVERITY_CRITICAL,
        "title":"SEND_SMS Permission",
        "description":"The application can send SMS",
    },
    
    "android.permissions.READ_SMS":{
        "rule_id":RULE_READ_SMS,
        "severity":SEVERITY_CRITICAL,
        "title":"READ_SMS Permission",
        "description":"The application can read SMS",
    },

    "android.permissions.RECEIVE_SMS":{
        "rule_id":RULE_RECEIVE_SMS,
        "severity":SEVERITY_CRITICAL,
        "title":"RECEIVE_SMS Permission",
        "description":"The application can receive SMS",
    },

    "android.permissions.READ_CONTACTS":{
        "rule_id":RULE_READ_CONTACTS,
        "severity":SEVERITY_HIGH,
        "title":"READ_CONTACTS Permission",
        "description":"The application can read contacts",
    },

    "android.permissions.RECORD_AUDIO":{
        "rule_id":RULE_RECORD_AUDIO,
        "severity":SEVERITY_HIGH,
        "title":"RECORD_AUDIO Permission",
        "description":"The application can record audio",
    },

    "android.permissions.SYSTEM_ALERT_WINDOW":{
        "rule_id":RULE_SYSTEM_ALERT_WINDOW,
        "severity":SEVERITY_HIGH,
        "title":"SYSTEM_ALERT_WINDOW Permission",
        "description":"The application can create windows that are shown on top of all other apps",
    },

    "android.permissions.REQUEST_INSTALL_PACKAGES":{
        "rule_id":RULE_REQUEST_INSTALL_PACKAGES,
        "severity":SEVERITY_CRITICAL,
        "title":"REQUEST_INSTALL_PACKAGES Permission",
        "description":"The application can request to install packages",
    }, 

}

def get_permission_rule(permission: str) -> dict| None:
    """
    Retrieve the rule associated with a specific permission.

    Args:
        permission: Android permission name.

    Returns:
        Rule of metadata if available, otherwise None.
    """

    return _PERMISSIONS_RULES.get(permission, None)             
