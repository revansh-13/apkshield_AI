import { AnalysisHeader } from "./AnalysisHeader";
import { MetadataCard } from "./MetadataCard";
import { RiskScoreCard } from "./RiskScoreCard";
import { AISummaryCard } from "./AISummaryCard";
import { StatCard } from "./StatCard";
import { FindingsPreview } from "./FindingsPreview";
import { ExportCard } from "./ExportCard";
import { MOCK_ANALYSIS_RESULT } from "@/mocks/analysis-data";
import { ShieldAlert, AlertTriangle, AlertCircle, Info, Timer, HardDrive } from "lucide-react";

export function DashboardContainer() {
  // In the future (F2.7), this will be fetched dynamically based on an ID
  const data = MOCK_ANALYSIS_RESULT;

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

      {/* 4. AI Summary (Moved up based on feedback) */}
      <AISummaryCard summary={data.aiSummary} />

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
