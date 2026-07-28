import { AISummary } from "@/shared/types/analysis";
import { Sparkles, ShieldAlert, Activity, ChevronRight } from "lucide-react";

interface AISummaryCardProps {
  summary: AISummary;
}

export function AISummaryCard({ summary }: AISummaryCardProps) {
  return (
    <section aria-labelledby="ai-summary-heading" className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-primary/10 pb-4">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 id="ai-summary-heading" className="text-lg font-semibold tracking-tight text-foreground">
          AI Executive Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Posture */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            Overall Posture
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary.overallPosture}
          </p>
        </div>

        {/* Critical Issues */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldAlert className="h-4 w-4 text-risk-critical" aria-hidden="true" />
            Primary Threats
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary.mostCriticalIssues}
          </p>
        </div>

        {/* Next Steps */}
        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
            Recommended Action
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary.recommendedNextSteps}
          </p>
        </div>

      </div>
    </section>
  );
}
