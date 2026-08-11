"use client";

import { AIAnalysisReport, AnalysisMetadata } from "@/shared/types/analysis";
import { AIReportHeader } from "./AIReportHeader";
import { ExecutiveSummaryCard } from "./ExecutiveSummaryCard";
import { SecurityPostureCard } from "./SecurityPostureCard";
import { ThreatBreakdownCard } from "./ThreatBreakdownCard";
import { RecommendationsCard } from "./RecommendationsCard";
import { ConfidenceCard } from "./ConfidenceCard";
import { ActionCard } from "./ActionCard";
import { DisclaimerCard } from "./DisclaimerCard";

import { formatDeterministicDate } from "@/lib/date";

interface AIReportProps {
  report: AIAnalysisReport;
  metadata: AnalysisMetadata;
}

export function AIReport({ report, metadata }: AIReportProps) {
  const handleCopyReport = () => {
    const textToCopy = `
APKShield AI Security Report - ${metadata.apkName}
Generated: ${formatDeterministicDate(metadata.timestamp)}

=== EXECUTIVE SUMMARY ===
${report.executiveSummary}

=== OVERALL RISK POSTURE ===
Risk: ${report.overallRiskLabel}
Primary Threat: ${report.mostCriticalIssue}

=== THREAT VECTORS ===
${report.threatThemes.map((t) => `- ${t.title} (${t.severity.toUpperCase()}): ${t.description}`).join("\n")}

=== ACTIONABLE RECOMMENDATIONS ===
${report.recommendations.map((r, i) => `${i + 1}. [${r.priority.toUpperCase()}] ${r.title}\n   ${r.summary}`).join("\n\n")}

Confidence Score: ${report.confidenceScore}% (${report.confidenceLevel})
`.trim();

    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy report: ", err);
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header */}
      <AIReportHeader apkName={metadata.apkName} timestamp={metadata.timestamp} />

      {/* 2. Executive Summary */}
      <ExecutiveSummaryCard summary={report.executiveSummary} />

      {/* 3. Security Posture */}
      <SecurityPostureCard
        overallRiskLabel={report.overallRiskLabel}
        mostCriticalIssue={report.mostCriticalIssue}
        positiveFindings={report.positiveFindings}
        remainingConcerns={report.remainingConcerns}
      />

      {/* 4. Threat Breakdown */}
      <ThreatBreakdownCard threatThemes={report.threatThemes} />

      {/* 5. Prioritized Recommendations */}
      <RecommendationsCard recommendations={report.recommendations} />

      {/* 6. Confidence Indicator */}
      <ConfidenceCard
        confidenceScore={report.confidenceScore}
        confidenceLevel={report.confidenceLevel}
      />

      {/* 7. Action Bar */}
      <ActionCard onCopyReport={handleCopyReport} />

      {/* 8. Disclaimer */}
      <DisclaimerCard />
    </div>
  );
}
