import { 
  AnalysisResult, 
  Severity, 
  FindingCategory, 
  Finding,
} from '@/shared/types/analysis';

// ─── Backend Contract Types ────────────────────────────────────────────────
// These types are derived from reading the actual backend source code.
// DO NOT use these types outside of the service/adapter layer.

/** Shape of a single finding from the Risk Engine. */
export interface BackendFinding {
  rule_id: string;
  title: string;
  severity: string;      // e.g. "HIGH", "MEDIUM", "LOW", "CRITICAL"
  description: string;
  category: string;
  evidence: Record<string, unknown>;
  // Note: `recommendation` is NOT returned by the Risk Engine.
  // It is absent from the actual backend. We omit it here.
}

/** Shape of the risk object from calculate_risk(). */
export interface BackendRisk {
  findings: BackendFinding[];
  risk_score: number;
  risk_level: string;    // e.g. "high", "medium", "low", "critical"
}

/**
 * Shape of the AI report from the mock provider.
 * The real provider will return the same keys (same contract).
 */
export interface BackendAI {
  executive_summary: string;
  overall_risk_assessment: string;
  findings: Array<{
    rule_id: string;
    explanation: string;
    security_impact: string;
    recommendation: string;
  }>;
}

/**
 * The `result` object nested inside the POST /analyze response body.
 * This is what analyze_apk() returns from app/services/analysis.py.
 */
export interface BackendAnalysisResult {
  analysis: Record<string, unknown>;
  risk: BackendRisk;
  ai: BackendAI;
}

/** Full POST /upload response body */
export interface BackendUploadResponse {
  status: string;
  message: string;
  metadata: {
    upload_id: string;
    original_filename: string;
    saved_filename: string;
    saved_path: string;
    file_size: number;        // in bytes
    upload_time: string;      // ISO 8601 UTC string
  };
  ready_for_analysis: boolean;
}

/** Full POST /analyze response body */
export interface BackendAnalyzeResponse {
  status: string;
  message: string;
  result: BackendAnalysisResult;
}

// ─── Adapter ──────────────────────────────────────────────────────────────

export function transformBackendResponse(
  analyzeResponse: BackendAnalyzeResponse,
  uploadMetadata: BackendUploadResponse['metadata'],
  analysisTimeMs: number,
): AnalysisResult {
  const { result } = analyzeResponse;
  const risk = result.risk;
  const ai = result.ai;

  // ── Findings ────────────────────────────────────────────────────────────
  const findings: Finding[] = (risk.findings ?? []).map((f, i) => ({
    id: `fnd_${i}_${f.rule_id}`,
    rule_id: f.rule_id ?? 'UNKNOWN',
    title: f.title ?? 'Unknown Finding',
    description: f.description ?? '',
    // Backend severities are UPPER_CASE; frontend expects lower_case
    severity: (f.severity?.toLowerCase() ?? 'info') as Severity,
    category: (f.category ?? 'Manifest') as FindingCategory,
    // Backend findings do not include `recommendation` in the Risk Engine.
    // Per-finding recommendations come from the AI report `findings` array.
    recommendation: '',
  }));

  // Build an AI-finding lookup so we can attach per-finding recommendations
  const aiRecommendationMap = new Map<string, string>(
    (ai.findings ?? []).map(af => [af.rule_id, af.recommendation ?? ''])
  );

  // Attach AI recommendations to findings where available
  const enrichedFindings: Finding[] = findings.map(f => ({
    ...f,
    recommendation: aiRecommendationMap.get(f.rule_id) ?? '',
  }));

  // ── Severity Counts ──────────────────────────────────────────────────────
  const severityCounts = {
    critical: enrichedFindings.filter(f => f.severity === 'critical').length,
    high:     enrichedFindings.filter(f => f.severity === 'high').length,
    medium:   enrichedFindings.filter(f => f.severity === 'medium').length,
    low:      enrichedFindings.filter(f => f.severity === 'low').length,
    info:     enrichedFindings.filter(f => f.severity === 'info').length,
  };

  // ── Metadata ─────────────────────────────────────────────────────────────
  const fileSizeMb = Number((uploadMetadata.file_size / (1024 * 1024)).toFixed(2));

  const metadata = {
    apkName: uploadMetadata.original_filename ?? 'unknown.apk',
    packageName: 'N/A',       // Backend does not expose package name in this response
    versionName: 'N/A',       // Backend does not expose version name in this response
    versionCode: 0,
    targetSdk: 0,
    minSdk: 0,
    fileSizeMb,
    analysisTimeMs,
    timestamp: uploadMetadata.upload_time ?? new Date().toISOString(),
    sha256: 'N/A',            // Backend does not expose SHA-256 in this response
  };

  // ── Legacy AI Summary ───────────────────────────────────────────────────
  const aiSummary = {
    overallPosture: ai.overall_risk_assessment ?? 'No AI assessment provided.',
    mostCriticalIssues: ai.executive_summary ?? 'No AI summary provided.',
    recommendedNextSteps: 'Review all identified findings.',
  };

  // ── Rich AI Report ───────────────────────────────────────────────────────
  // Map to the AIAnalysisReport interface used by the AIReport component.
  const riskLabel =
    risk.risk_level.charAt(0).toUpperCase() + risk.risk_level.slice(1).toLowerCase();

  const aiReport = {
    executiveSummary: ai.executive_summary ?? 'Automated security analysis completed.',
    overallRiskLabel: `${riskLabel} Exposure`,
    mostCriticalIssue: ai.overall_risk_assessment ?? 'Review critical and high findings.',
    positiveFindings: ['Scan completed successfully.'],
    remainingConcerns: enrichedFindings
      .filter(f => f.severity === 'critical' || f.severity === 'high')
      .slice(0, 3)
      .map(f => f.title),
    threatThemes: [],
    recommendations: (ai.findings ?? []).slice(0, 5).map(af => ({
      id: `rec_${af.rule_id}`,
      title: af.rule_id,
      summary: af.recommendation,
      priority: 'high' as Severity,
      actionSteps: [af.recommendation],
      impact: af.security_impact ?? '',
    })),
    confidenceScore: 75,
    confidenceLevel: 'Medium' as const,
  };

  return {
    id: `res_${uploadMetadata.upload_id}`,
    status: analyzeResponse.status === 'success' ? 'success' : 'failed',
    riskScore: risk.risk_score ?? 0,
    riskLevel: (risk.risk_level?.toLowerCase() ?? 'info') as Severity,
    metadata,
    summary: {
      totalFindings: enrichedFindings.length,
      severityCounts,
    },
    aiSummary,
    aiReport,
    findings: enrichedFindings,
  };
}
