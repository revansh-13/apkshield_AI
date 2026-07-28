import { Finding, Severity } from "@/shared/types/analysis";
import { cn } from "@/lib/utils";
import { ShieldAlert, AlertTriangle, AlertCircle, Info, ShieldCheck, FileText, Lock, Network, BadgeCheck, FileCode2, KeyRound } from "lucide-react";

interface FindingRowProps {
  finding: Finding;
}

const severityConfig: Record<Severity, { icon: React.ElementType; color: string; label: string }> = {
  critical: { icon: ShieldAlert, color: "text-risk-critical bg-risk-critical/10 border-risk-critical/20", label: "Critical" },
  high: { icon: AlertTriangle, color: "text-risk-high bg-risk-high/10 border-risk-high/20", label: "High" },
  medium: { icon: AlertCircle, color: "text-risk-medium bg-risk-medium/10 border-risk-medium/20", label: "Medium" },
  low: { icon: Info, color: "text-risk-low bg-risk-low/10 border-risk-low/20", label: "Low" },
  info: { icon: ShieldCheck, color: "text-risk-info bg-risk-info/10 border-risk-info/20", label: "Info" },
};

const categoryIcon: Record<string, React.ElementType> = {
  Manifest: FileText,
  Permissions: Lock,
  Components: FileCode2,
  URLs: Network,
  Certificates: BadgeCheck,
  Strings: KeyRound,
  Code: FileCode2,
};

export function FindingRow({ finding }: FindingRowProps) {
  const config = severityConfig[finding.severity];
  const Icon = config.icon;
  const CategoryIcon = categoryIcon[finding.category] || FileText;

  return (
    <div className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
      {/* Left: Severity Badge */}
      <div className="shrink-0 flex sm:flex-col items-center gap-2 sm:w-24">
        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold", config.color)}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="uppercase tracking-wide">{config.label}</span>
        </div>
      </div>

      {/* Middle: Content */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground truncate" title={finding.title}>
            {finding.title}
          </h4>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border">
            <CategoryIcon className="h-3 w-3" aria-hidden="true" />
            {finding.category}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {finding.description}
        </p>
        
        <div className="mt-2 text-xs text-muted-foreground border-l-2 border-primary/30 pl-3">
          <span className="font-semibold text-foreground mr-1">Recommendation:</span>
          {finding.recommendation}
        </div>
      </div>
      
      {/* Right: Rule ID */}
      <div className="shrink-0 sm:self-center">
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border">
          {finding.rule_id}
        </span>
      </div>
    </div>
  );
}
