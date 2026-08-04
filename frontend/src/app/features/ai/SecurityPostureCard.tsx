import { ShieldAlert, CheckCircle2, AlertTriangle, Activity } from "lucide-react";

interface SecurityPostureCardProps {
  overallRiskLabel: string;
  mostCriticalIssue: string;
  positiveFindings: string[];
  remainingConcerns: string[];
}

export function SecurityPostureCard({
  overallRiskLabel,
  mostCriticalIssue,
  positiveFindings,
  remainingConcerns,
}: SecurityPostureCardProps) {
  return (
    <section aria-labelledby="security-posture-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <Activity className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h3 id="security-posture-heading" className="text-base font-semibold tracking-tight text-foreground">
          Security Posture Breakdown
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Risk & Primary Threat */}
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-risk-critical/20 bg-risk-critical/5 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-risk-critical mb-1">
              <ShieldAlert className="h-4 w-4" aria-hidden="true" />
              Overall Risk Profile: {overallRiskLabel}
            </div>
            <p className="text-sm font-medium text-foreground mt-2">
              <span className="font-semibold text-risk-critical">Most Critical Exposure:</span> {mostCriticalIssue}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              <AlertTriangle className="h-4 w-4 text-risk-high" aria-hidden="true" />
              Key Security Concerns
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground" role="list">
              {remainingConcerns.map((concern, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-risk-high font-bold select-none">•</span>
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Positive Findings */}
        <div className="rounded-lg border border-risk-low/20 bg-risk-low/5 p-4 flex flex-col">
          <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-risk-low mb-3">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Validated Positive Controls
          </h4>
          <ul className="space-y-2.5 text-xs text-muted-foreground flex-1" role="list">
            {positiveFindings.map((positive, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-risk-low font-bold select-none">✓</span>
                <span>{positive}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
