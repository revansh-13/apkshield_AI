import { AnalysisResult } from "@/shared/types/analysis";

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  id: "ana_98f72a9b3e1c",
  status: "success",
  riskScore: 82,
  riskLevel: "high",
  metadata: {
    apkName: "com.example.bankapp_v2.4.1.apk",
    packageName: "com.example.bankapp",
    versionName: "2.4.1",
    versionCode: 241,
    targetSdk: 33,
    minSdk: 24,
    fileSizeMb: 45.2,
    analysisTimeMs: 14520,
    timestamp: new Date().toISOString(),
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  summary: {
    totalFindings: 28,
    severityCounts: {
      critical: 3,
      high: 6,
      medium: 9,
      low: 10,
      info: 0
    }
  },
  aiSummary: {
    overallPosture: "The application exhibits a high-risk security posture primarily due to insecure data transmission endpoints and overly permissive exported components. While the certificate signing and general manifest configurations are standard, the presence of hardcoded credentials poses an immediate threat.",
    mostCriticalIssues: "The most critical vulnerabilities include a hardcoded AWS S3 bucket credential in the DEX bytecode and an exported Activity (`TransferActivity`) that lacks permission checks, potentially allowing malicious apps to bypass authentication.",
    recommendedNextSteps: "Immediately rotate the exposed AWS credentials and remove them from the source code. Enforce signature-level permissions on all exported activities and services. Upgrade all HTTP endpoints to strictly enforce HTTPS with certificate pinning."
  },
  findings: [
    // ── CRITICAL ──────────────────────────────────────────
    {
      id: "fnd_001",
      rule_id: "STR-001",
      title: "Hardcoded AWS Credentials",
      description: "Found potential AWS Access Key ID and Secret Key hardcoded in class com.example.bankapp.utils.S3Helper. The key pattern matches AKIA[0-9A-Z]{16} which is a valid AWS access key format.",
      severity: "critical",
      category: "Strings",
      recommendation: "Remove credentials from source code. Use a secure backend service to broker access to S3, or utilize AWS Cognito for client-side authentication."
    },
    {
      id: "fnd_002",
      rule_id: "CMP-012",
      title: "Unprotected Exported Activity",
      description: "Activity 'com.example.bankapp.TransferActivity' is exported but requires no permissions to invoke. Any third-party application on the device can launch this activity directly.",
      severity: "critical",
      category: "Components",
      recommendation: "Set 'android:exported=\"false\"' if this activity is internal. If it must be exported, enforce a signature-level permission."
    },
    {
      id: "fnd_003",
      rule_id: "CRT-003",
      title: "Self-Signed Debug Certificate in Release Build",
      description: "The APK is signed with a self-signed certificate using CN=Android Debug. This indicates a debug keystore was used for a release build, weakening integrity verification.",
      severity: "critical",
      category: "Certificates",
      recommendation: "Re-sign the APK with a properly generated release keystore. Enroll the signing key in Google Play App Signing for additional protection."
    },

    // ── HIGH ──────────────────────────────────────────────
    {
      id: "fnd_004",
      rule_id: "URL-004",
      title: "Cleartext HTTP Endpoint",
      description: "Found HTTP URL 'http://api.dev.example.com/v1/sync' in strings.xml. Data transmitted over HTTP is vulnerable to interception via man-in-the-middle attacks.",
      severity: "high",
      category: "URLs",
      recommendation: "Update the endpoint to use HTTPS. Ensure network security configuration forbids cleartext traffic."
    },
    {
      id: "fnd_005",
      rule_id: "STR-008",
      title: "Hardcoded Firebase Server Key",
      description: "A Firebase Cloud Messaging server key was found in class com.example.bankapp.push.FCMHelper. Server keys should never be embedded in client applications.",
      severity: "high",
      category: "Strings",
      recommendation: "Remove the server key from the client. Use Firebase Admin SDK on your backend to send push notifications."
    },
    {
      id: "fnd_006",
      rule_id: "CMP-007",
      title: "Exported Content Provider Without Permissions",
      description: "ContentProvider 'com.example.bankapp.data.UserDataProvider' is exported with no read or write permissions. External apps can query or modify user data.",
      severity: "high",
      category: "Components",
      recommendation: "Set android:exported=\"false\" or define signature-level read and write permissions on the provider."
    },
    {
      id: "fnd_007",
      rule_id: "PRM-002",
      title: "WRITE_EXTERNAL_STORAGE on SDK 33+",
      description: "The app requests WRITE_EXTERNAL_STORAGE but targets SDK 33. This permission is deprecated and replaced by scoped storage APIs.",
      severity: "high",
      category: "Permissions",
      recommendation: "Migrate to scoped storage using MediaStore or SAF APIs. Remove the deprecated permission from the manifest."
    },
    {
      id: "fnd_008",
      rule_id: "URL-009",
      title: "Hardcoded Internal IP Address",
      description: "Found internal network address '192.168.1.100:8080' referenced in com.example.bankapp.network.DevConfig. This suggests a development endpoint shipped in production.",
      severity: "high",
      category: "URLs",
      recommendation: "Remove all internal/development network addresses from the production build. Use build flavors to separate dev and production configurations."
    },
    {
      id: "fnd_009",
      rule_id: "MAN-009",
      title: "Debuggable Application",
      description: "android:debuggable is explicitly set to true in the manifest. This allows runtime debugging and memory inspection on any device.",
      severity: "high",
      category: "Manifest",
      recommendation: "Remove android:debuggable=\"true\" or set it to false for release builds. Use build types to control this flag automatically."
    },

    // ── MEDIUM ────────────────────────────────────────────
    {
      id: "fnd_010",
      rule_id: "MAN-002",
      title: "Backup Enabled",
      description: "Application explicitly sets android:allowBackup=\"true\" in the manifest. This allows users and ADB to extract application data including SharedPreferences and databases.",
      severity: "medium",
      category: "Manifest",
      recommendation: "Set allowBackup to false to prevent potential data leakage of sensitive SharedPreferences via adb backup."
    },
    {
      id: "fnd_011",
      rule_id: "CRT-006",
      title: "Weak Signing Algorithm (SHA1withRSA)",
      description: "The APK certificate uses SHA1withRSA signature algorithm which is considered cryptographically weak. SHA-1 has known collision vulnerabilities.",
      severity: "medium",
      category: "Certificates",
      recommendation: "Re-sign the APK using SHA256withRSA or SHA512withRSA. Update the keystore to use a modern algorithm."
    },
    {
      id: "fnd_012",
      rule_id: "PRM-005",
      title: "Camera Permission Without Clear Justification",
      description: "CAMERA permission is declared but the app's core banking functionality does not appear to require camera access based on manifest analysis.",
      severity: "medium",
      category: "Permissions",
      recommendation: "Verify if camera access is necessary. If used for check deposit, document the justification. Otherwise, remove the permission."
    },
    {
      id: "fnd_013",
      rule_id: "CMP-015",
      title: "Implicit Intent Broadcast Receiver",
      description: "BroadcastReceiver 'com.example.bankapp.receivers.BootReceiver' listens for BOOT_COMPLETED with no permission restriction. Any app can trigger it via a spoofed intent.",
      severity: "medium",
      category: "Components",
      recommendation: "Add a custom permission to the receiver or use LocalBroadcastManager for internal communications."
    },
    {
      id: "fnd_014",
      rule_id: "URL-012",
      title: "Mixed Content: HTTPS Page Loading HTTP Resources",
      description: "WebView in com.example.bankapp.ui.HelpActivity loads HTTPS pages but allows mixed content via setMixedContentMode(MIXED_CONTENT_ALWAYS_ALLOW).",
      severity: "medium",
      category: "URLs",
      recommendation: "Set mixed content mode to MIXED_CONTENT_NEVER_ALLOW. Ensure all embedded resources are served over HTTPS."
    },
    {
      id: "fnd_015",
      rule_id: "STR-014",
      title: "Hardcoded Database Password",
      description: "String 'db_password=BankApp2024!' found in com.example.bankapp.db.DatabaseHelper. Database credentials should not be stored in application code.",
      severity: "medium",
      category: "Strings",
      recommendation: "Use Android Keystore to derive encryption keys. Never store plain-text passwords in source code or resource files."
    },
    {
      id: "fnd_016",
      rule_id: "MAN-014",
      title: "Missing Network Security Configuration",
      description: "No network_security_config.xml is referenced in the manifest. The app relies on platform defaults which may permit cleartext on older API levels.",
      severity: "medium",
      category: "Manifest",
      recommendation: "Create a network security configuration that explicitly disallows cleartext traffic and pins certificates for critical domains."
    },
    {
      id: "fnd_017",
      rule_id: "CRT-009",
      title: "Certificate Validity Exceeds 25 Years",
      description: "The signing certificate has a validity period of 50 years. While functional, this exceeds Google Play's recommended maximum of 25 years.",
      severity: "medium",
      category: "Certificates",
      recommendation: "Consider rotating to a certificate with a validity period under 25 years. Enroll in Google Play App Signing for key management."
    },
    {
      id: "fnd_018",
      rule_id: "PRM-011",
      title: "READ_PHONE_STATE Permission Requested",
      description: "READ_PHONE_STATE grants access to phone number, IMEI, and carrier info. This is sensitive PII that most banking apps do not need.",
      severity: "medium",
      category: "Permissions",
      recommendation: "Remove READ_PHONE_STATE unless absolutely required for device verification. Use alternative identifiers like Firebase Installation ID."
    },

    // ── LOW ───────────────────────────────────────────────
    {
      id: "fnd_019",
      rule_id: "PRM-008",
      title: "Location Permission Requested",
      description: "ACCESS_FINE_LOCATION is requested but may not be necessary for core banking functionality.",
      severity: "low",
      category: "Permissions",
      recommendation: "Review if fine location is strictly necessary. Consider downgrading to ACCESS_COARSE_LOCATION or removing it."
    },
    {
      id: "fnd_020",
      rule_id: "MAN-018",
      title: "Missing usesCleartextTraffic Attribute",
      description: "The manifest does not explicitly set android:usesCleartextTraffic. On API 27 and below, cleartext traffic is permitted by default.",
      severity: "low",
      category: "Manifest",
      recommendation: "Explicitly set android:usesCleartextTraffic=\"false\" in the application tag."
    },
    {
      id: "fnd_021",
      rule_id: "CMP-020",
      title: "Service Without exported=false Declaration",
      description: "Service 'com.example.bankapp.sync.SyncService' does not explicitly declare android:exported. On API 31+, this will cause an installation error.",
      severity: "low",
      category: "Components",
      recommendation: "Explicitly set android:exported=\"false\" on all services that are not meant to be accessed by external applications."
    },
    {
      id: "fnd_022",
      rule_id: "STR-019",
      title: "Verbose Logging Statements",
      description: "Found 47 instances of Log.d() and Log.v() calls across the codebase. Verbose logging in production can leak sensitive information to logcat.",
      severity: "low",
      category: "Strings",
      recommendation: "Remove or guard debug logging behind BuildConfig.DEBUG checks. Use Timber or a logging framework that strips logs in release builds."
    },
    {
      id: "fnd_023",
      rule_id: "URL-017",
      title: "Localhost Reference in Production Code",
      description: "Found reference to 'http://localhost:3000/api' in com.example.bankapp.network.ApiClient. This is a non-functional development artifact.",
      severity: "low",
      category: "URLs",
      recommendation: "Remove all localhost references from production code. Use build flavors to inject the correct base URL."
    },
    {
      id: "fnd_024",
      rule_id: "PRM-015",
      title: "VIBRATE Permission Declared",
      description: "VIBRATE permission is requested. While low-risk, it should be declared only if haptic feedback is a documented feature.",
      severity: "low",
      category: "Permissions",
      recommendation: "Confirm that vibration is used for transaction confirmations or notifications. Remove if unused."
    },
    {
      id: "fnd_025",
      rule_id: "MAN-022",
      title: "Minimum SDK Below 24",
      description: "The app sets minSdkVersion to 21 (Android 5.0). Devices running API 21-23 lack several security features including file-based encryption and network security config.",
      severity: "low",
      category: "Manifest",
      recommendation: "Consider raising minSdkVersion to 24 (Android 7.0) to leverage improved security defaults and reduce the attack surface."
    },
    {
      id: "fnd_026",
      rule_id: "CMP-025",
      title: "Activity Handles Deep Link Without Validation",
      description: "Activity 'com.example.bankapp.DeepLinkActivity' accepts ACTION_VIEW intents with scheme 'bankapp://' but does not validate the host or path parameters.",
      severity: "low",
      category: "Components",
      recommendation: "Validate all deep link parameters before processing. Implement allowlisting of expected hosts and paths."
    },
    {
      id: "fnd_027",
      rule_id: "CRT-012",
      title: "RSA Key Length 1024-bit",
      description: "The signing certificate uses a 1024-bit RSA key. NIST recommends a minimum of 2048-bit RSA keys for adequate security.",
      severity: "low",
      category: "Certificates",
      recommendation: "Generate a new signing key with at least 2048-bit RSA (preferably 4096-bit) and re-sign the application."
    },
    {
      id: "fnd_028",
      rule_id: "STR-024",
      title: "TODO Comment References Security Fix",
      description: "Found comment 'TODO: fix SSL pinning before release' in com.example.bankapp.network.SSLHelper. This suggests an incomplete security implementation.",
      severity: "low",
      category: "Strings",
      recommendation: "Resolve the TODO by implementing certificate pinning. Remove or address all security-related TODO comments before release."
    }
  ]
};
