import { Cpu, ShieldCheck } from "lucide-react";

interface ConfidenceCardProps {
  confidenceScore: number;
  confidenceLevel: "High" | "Medium" | "Low";
}

export function ConfidenceCard({ confidenceScore, confidenceLevel }: ConfidenceCardProps) {
  return (
    <section aria-labelledby="confidence-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Cpu className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 id="confidence-heading" className="text-sm font-semibold text-foreground">
              Synthesis Confidence: {confidenceScore}% ({confidenceLevel})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Derived deterministically from verified static analysis findings.
            </p>
          </div>
        </div>

        <div
          role="meter"
          aria-valuenow={confidenceScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`AI confidence score ${confidenceScore} percent`}
          className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-sm font-bold border border-primary/20"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>{confidenceScore}%</span>
        </div>
      </div>
    </section>
  );
}
