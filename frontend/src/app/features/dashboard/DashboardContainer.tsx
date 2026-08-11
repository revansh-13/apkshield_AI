"use client";

import { useRouter } from "next/navigation";
import { AnalysisHeader } from "./AnalysisHeader";
import { MetadataCard } from "./MetadataCard";
import { RiskScoreCard } from "./RiskScoreCard";
import { AISummaryCard } from "./AISummaryCard";
import { AIReport } from "@/app/features/ai/AIReport";
import { StatCard } from "./StatCard";
import { FindingsPreview } from "./FindingsPreview";
import { ExportCard } from "./ExportCard";
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Timer, HardDrive, FileQuestion } from "lucide-react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useHasHydrated } from "@/hooks/useHasHydrated";

export function DashboardContainer() {
  const { currentAnalysis } = useAnalysisStore();
  const hasHydrated = useHasHydrated();
  const router = useRouter();

  // Force null during SSR/initial hydration to match server output
  const data = hasHydrated ? currentAnalysis : null;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto text-center gap-6">
        <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center border border-muted">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">No Analysis Found</h2>
          <p className="text-muted-foreground">
            You haven&apos;t uploaded an APK yet or the previous analysis session has expired. 
            Please upload a new file to view the dashboard.
          </p>
        </div>
        <button
          onClick={() => router.push("/upload")}
          className="mt-4 rounded-xl bg-primary text-primary-foreground py-3 px-8 font-semibold transition-colors hover:bg-primary/90"
        >
          Upload APK
        </button>
      </div>
    );
  }

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-12">
      
      {/* 1. Header */}
      <AnalysisHeader />

      {/* 2. Metadata */}
      <MetadataCard metadata={data.metadata} />

      {/* 3. Risk Score Hero */}
      <RiskScoreCard score={data.riskScore} level={data.riskLevel} />

      {/* 4. AI Report Section (Expanded structured report) */}
      {data.aiReport ? (
        <AIReport report={data.aiReport} metadata={data.metadata} />
      ) : (
        <AISummaryCard summary={data.aiSummary} />
      )}

      {/* 5. Summary Statistics Grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Summary Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard 
            label="Critical" 
            value={data.summary.severityCounts.critical} 
            icon={ShieldAlert} 
            colorClass="text-risk-critical"
          />
          <StatCard 
            label="High" 
            value={data.summary.severityCounts.high} 
            icon={AlertTriangle} 
            colorClass="text-risk-high"
          />
          <StatCard 
            label="Medium" 
            value={data.summary.severityCounts.medium} 
            icon={AlertCircle} 
            colorClass="text-risk-medium"
          />
          <StatCard 
            label="Low" 
            value={data.summary.severityCounts.low} 
            icon={Info} 
            colorClass="text-risk-low"
          />
          <StatCard 
            label="Analysis Time" 
            value={formatTime(data.metadata.analysisTimeMs)} 
            icon={Timer} 
          />
          <StatCard 
            label="APK Size" 
            value={`${data.metadata.fileSizeMb} MB`} 
            icon={HardDrive} 
          />
        </div>
      </section>

      {/* 6. Findings Preview */}
      <FindingsPreview findings={data.findings} />

      {/* 7. Export Options */}
      <ExportCard />

    </div>
  );
}
