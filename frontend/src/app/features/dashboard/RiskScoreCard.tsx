import { Severity } from "@/shared/types/analysis";
import { RiskGauge } from "./RiskGauge";

interface RiskScoreCardProps {
  score: number;
  level: Severity;
}

export function RiskScoreCard({ score, level }: RiskScoreCardProps) {
  return (
    <section 
      aria-labelledby="risk-score-heading"
      className="flex flex-col md:flex-row items-center gap-8 rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm"
    >
      <div className="flex-shrink-0">
        <RiskGauge score={score} level={level} />
      </div>
      
      <div className="flex flex-col text-center md:text-left">
        <h2 id="risk-score-heading" className="text-2xl font-bold tracking-tight text-foreground">
          Overall Security Posture
        </h2>
        <p className="text-muted-foreground mt-2 leading-relaxed max-w-2xl">
          This score represents the aggregated severity of all discovered vulnerabilities, 
          hardcoded secrets, and misconfigurations. A higher score indicates greater exposure 
          to potential exploitation.
        </p>
      </div>
    </section>
  );
}
