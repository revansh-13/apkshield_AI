export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type FindingCategory = "Manifest" | "Permissions" | "Components" | "URLs" | "Certificates" | "Strings" | "Code";

export type EvidenceValue = string | number | boolean | null | string[];

export interface Finding {
  id: string;
  rule_id: string;
  title: string;
  description: string;
  severity: Severity;
  category: FindingCategory;
  recommendation: string;
  evidence?: Record<string, EvidenceValue>;
  aiExplanation?: string;
  aiImpact?: string;
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

export interface ThreatTheme {
  id: string;
  title: string;
  severity: Severity;
  findingCount: number;
  description: string;
}

export interface RemediationRecommendation {
  id: string;
  title: string;
  priority: Severity;
  summary: string;
  actionSteps: string[];
  impact: string;
}

export interface AIAnalysisReport {
  executiveSummary: string;
  overallRiskLabel: string;
  mostCriticalIssue: string;
  positiveFindings: string[];
  remainingConcerns: string[];
  threatThemes: ThreatTheme[];
  recommendations: RemediationRecommendation[];
  confidenceScore: number; // e.g. 92
  confidenceLevel: "High" | "Medium" | "Low";
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
  aiReport?: AIAnalysisReport;
  findings: Finding[];
}

export interface HistorySummary {
  analysis_id: string;
  apkName: string;
  fileSizeMb: number;
  riskScore: number;
  riskLevel: Severity;
  totalFindings: number;
  severityCounts: Record<Severity, number>;
  timestamp: string;
}
