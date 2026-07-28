export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type FindingCategory = "Manifest" | "Permissions" | "Components" | "URLs" | "Certificates" | "Strings" | "Code";

export interface Finding {
  id: string;
  rule_id: string;
  title: string;
  description: string;
  severity: Severity;
  category: FindingCategory;
  recommendation: string;
}

export interface AnalysisMetadata {
  apkName: string;
  packageName: string;
  versionName: string;
  versionCode: number;
  targetSdk: number;
  minSdk: number;
  fileSizeMb: number;
  analysisTimeMs: number;
  timestamp: string;
  sha256: string;
}

export interface AISummary {
  overallPosture: string;
  mostCriticalIssues: string;
  recommendedNextSteps: string;
}

export interface AnalysisSummary {
  totalFindings: number;
  severityCounts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export interface AnalysisResult {
  id: string;
  status: "success" | "failed" | "processing";
  riskScore: number; // 0-100
  riskLevel: Severity;
  metadata: AnalysisMetadata;
  summary: AnalysisSummary;
  aiSummary: AISummary;
  findings: Finding[];
}
