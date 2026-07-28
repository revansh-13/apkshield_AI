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
    totalFindings: 42,
    severityCounts: {
      critical: 2,
      high: 5,
      medium: 12,
      low: 23,
      info: 10
    }
  },
  aiSummary: {
    overallPosture: "The application exhibits a high-risk security posture primarily due to insecure data transmission endpoints and overly permissive exported components. While the certificate signing and general manifest configurations are standard, the presence of hardcoded credentials poses an immediate threat.",
    mostCriticalIssues: "The most critical vulnerabilities include a hardcoded AWS S3 bucket credential in the DEX bytecode and an exported Activity (`TransferActivity`) that lacks permission checks, potentially allowing malicious apps to bypass authentication.",
    recommendedNextSteps: "Immediately rotate the exposed AWS credentials and remove them from the source code. Enforce signature-level permissions on all exported activities and services. Upgrade all HTTP endpoints to strictly enforce HTTPS with certificate pinning."
  },
  findings: [
    {
      id: "fnd_001",
      rule_id: "STR-001",
      title: "Hardcoded AWS Credentials",
      description: "Found potential AWS Access Key ID and Secret Key hardcoded in class com.example.bankapp.utils.S3Helper.",
      severity: "critical",
      category: "Strings",
      recommendation: "Remove credentials from source code. Use a secure backend service to broker access to S3, or utilize AWS Cognito for client-side authentication."
    },
    {
      id: "fnd_002",
      rule_id: "CMP-012",
      title: "Unprotected Exported Activity",
      description: "Activity 'com.example.bankapp.TransferActivity' is exported but requires no permissions to invoke.",
      severity: "critical",
      category: "Components",
      recommendation: "Set 'android:exported=\"false\"' if this activity is internal. If it must be exported, enforce a signature-level permission."
    },
    {
      id: "fnd_003",
      rule_id: "URL-004",
      title: "Cleartext HTTP Endpoint",
      description: "Found HTTP URL 'http://api.dev.example.com/v1/sync' in strings.xml.",
      severity: "high",
      category: "URLs",
      recommendation: "Update the endpoint to use HTTPS. Ensure network security configuration forbids cleartext traffic."
    },
    {
      id: "fnd_004",
      rule_id: "MAN-002",
      title: "Backup Enabled",
      description: "Application explicitly sets android:allowBackup=\"true\" in the manifest.",
      severity: "medium",
      category: "Manifest",
      recommendation: "Set allowBackup to false to prevent potential data leakage of sensitive SharedPreferences via adb backup."
    },
    {
      id: "fnd_005",
      rule_id: "PRM-008",
      title: "Location Permission Requested",
      description: "ACCESS_FINE_LOCATION is requested but may not be necessary for core banking functionality.",
      severity: "low",
      category: "Permissions",
      recommendation: "Review if fine location is strictly necessary. Consider downgrading to ACCESS_COARSE_LOCATION or removing it."
    }
  ]
};
