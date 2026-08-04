"use client";

import { RemediationRecommendation, Severity } from "@/shared/types/analysis";
import { ChevronDown, CheckSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface RecommendationItemProps {
  recommendation: RemediationRecommendation;
  isExpanded: boolean;
  onToggle: () => void;
}

const priorityBadge: Record<Severity, { color: string; label: string }> = {
  critical: { color: "text-risk-critical bg-risk-critical/10 border-risk-critical/20", label: "Critical Priority" },
  high: { color: "text-risk-high bg-risk-high/10 border-risk-high/20", label: "High Priority" },
  medium: { color: "text-risk-medium bg-risk-medium/10 border-risk-medium/20", label: "Medium Priority" },
  low: { color: "text-risk-low bg-risk-low/10 border-risk-low/20", label: "Low Priority" },
  info: { color: "text-risk-info bg-risk-info/10 border-risk-info/20", label: "Info Priority" },
};

export function RecommendationItem({ recommendation, isExpanded, onToggle }: RecommendationItemProps) {
  const badge = priorityBadge[recommendation.priority];
  const panelId = `rec-panel-${recommendation.id}`;
  const headerId = `rec-header-${recommendation.id}`;

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <button
        id={headerId}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={cn(
          "w-full flex items-center justify-between gap-4 p-4 text-left transition-colors",
          "hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          isExpanded && "bg-accent/20"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 overflow-hidden">
          <div className={cn("shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold w-fit", badge.color)}>
            {badge.label}
          </div>
          <span className="text-sm font-semibold text-foreground truncate" title={recommendation.title}>
            {recommendation.title}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-5 space-y-4 bg-muted/10">
              <p className="text-sm text-foreground font-medium">
                {recommendation.summary}
              </p>

              <div>
                <h5 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <CheckSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  Actionable Steps
                </h5>
                <ol className="space-y-1.5 text-xs text-foreground list-decimal list-inside" role="list">
                  {recommendation.actionSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="font-mono">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-lg border border-border bg-card p-3 flex items-start gap-2 text-xs">
                <ShieldCheck className="h-4 w-4 text-risk-low shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-foreground">Expected Impact: </span>
                  <span className="text-muted-foreground">{recommendation.impact}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
