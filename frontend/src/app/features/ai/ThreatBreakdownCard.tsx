import { ThreatTheme, Severity } from "@/shared/types/analysis";
import { ShieldAlert, AlertTriangle, AlertCircle, Info, ShieldCheck, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreatBreakdownCardProps {
  threatThemes: ThreatTheme[];
}

const severityConfig: Record<Severity, { icon: React.ElementType; color: string; label: string }> = {
  critical: { icon: ShieldAlert, color: "text-risk-critical bg-risk-critical/10 border-risk-critical/20", label: "Critical" },
  high: { icon: AlertTriangle, color: "text-risk-high bg-risk-high/10 border-risk-high/20", label: "High" },
  medium: { icon: AlertCircle, color: "text-risk-medium bg-risk-medium/10 border-risk-medium/20", label: "Medium" },
  low: { icon: Info, color: "text-risk-low bg-risk-low/10 border-risk-low/20", label: "Low" },
  info: { icon: ShieldCheck, color: "text-risk-info bg-risk-info/10 border-risk-info/20", label: "Info" },
};

export function ThreatBreakdownCard({ threatThemes }: ThreatBreakdownCardProps) {
  return (
    <section aria-labelledby="threat-breakdown-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <Layers className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h3 id="threat-breakdown-heading" className="text-base font-semibold tracking-tight text-foreground">
          Major Threat Vectors
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {threatThemes.map((theme) => {
          const config = severityConfig[theme.severity];
          const Icon = config.icon;

          return (
            <div
              key={theme.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:bg-accent/40"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-foreground truncate" title={theme.title}>
                  {theme.title}
                </h4>
                <div className={cn("shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold", config.color)}>
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  <span>{config.label}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {theme.description}
              </p>

              <div className="mt-1 text-xs font-medium text-muted-foreground">
                Affects <span className="font-semibold text-foreground">{theme.findingCount}</span> related findings
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
