"use client";

import { Finding, Severity } from "@/shared/types/analysis";
import { SEVERITY_LABELS } from "./constants";
import { cn } from "@/lib/utils";
import {
  ShieldAlert, AlertTriangle, AlertCircle, Info, ShieldCheck,
  FileText, Lock, Network, BadgeCheck, FileCode2, KeyRound,
  ChevronDown, Lightbulb, Code2, BookOpen, Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Config maps ───────────────────────────────────────────

const severityStyle: Record<Severity, { icon: React.ElementType; color: string }> = {
  critical: { icon: ShieldAlert, color: "text-risk-critical bg-risk-critical/10 border-risk-critical/20" },
  high: { icon: AlertTriangle, color: "text-risk-high bg-risk-high/10 border-risk-high/20" },
  medium: { icon: AlertCircle, color: "text-risk-medium bg-risk-medium/10 border-risk-medium/20" },
  low: { icon: Info, color: "text-risk-low bg-risk-low/10 border-risk-low/20" },
  info: { icon: ShieldCheck, color: "text-risk-info bg-risk-info/10 border-risk-info/20" },
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

// ── Component ─────────────────────────────────────────────

interface FindingCardProps {
  finding: Finding;
  isExpanded: boolean;
  onToggle: () => void;
}

export function FindingCard({ finding, isExpanded, onToggle }: FindingCardProps) {
  const sev = severityStyle[finding.severity];
  const SevIcon = sev.icon;
  const CatIcon = categoryIcon[finding.category] || FileText;
  const panelId = `finding-panel-${finding.id}`;
  const headerId = `finding-header-${finding.id}`;

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Collapsed header — always visible */}
      <button
        id={headerId}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={cn(
          "w-full flex items-center gap-4 p-4 text-left transition-colors",
          "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
          isExpanded && "bg-accent/30"
        )}
      >
        {/* Severity badge */}
        <div className={cn("shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold", sev.color)}>
          <SevIcon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="uppercase tracking-wide">{SEVERITY_LABELS[finding.severity]}</span>
        </div>

        {/* Title */}
        <span className="flex-1 text-sm font-semibold text-foreground truncate" title={finding.title}>
          {finding.title}
        </span>

        {/* Category pill */}
        <span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border">
          <CatIcon className="h-3 w-3" aria-hidden="true" />
          {finding.category}
        </span>

        {/* Rule ID */}
        <span className="hidden md:inline shrink-0 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border">
          {finding.rule_id}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Expanded panel */}
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
            <div className="border-t border-border px-4 py-5 space-y-5">
              {/* Mobile-only category + rule */}
              <div className="flex flex-wrap gap-2 sm:hidden">
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                  <CatIcon className="h-3 w-3" aria-hidden="true" />
                  {finding.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border">
                  {finding.rule_id}
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Description
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {finding.description}
                </p>
              </div>

              {/* Recommendation */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                  Recommendation
                </h4>
                <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
                  {finding.recommendation}
                </p>
              </div>

              {/* Technical Details (Evidence) */}
              {finding.evidence && Object.keys(finding.evidence).length > 0 ? (
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Technical Evidence
                  </h4>
                  <div className="overflow-x-auto rounded-md bg-background/50 border border-border/50 p-3 max-h-48 overflow-y-auto">
                    <pre className="text-[11px] text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap break-words">
                      {JSON.stringify(finding.evidence, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : null}

              {/* AI Context (Explanation & Impact) */}
              {(finding.aiExplanation || finding.aiImpact) ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    AI Context
                  </h4>
                  
                  {finding.aiExplanation && (
                    <div>
                      <span className="text-xs font-semibold text-foreground/80 block mb-1">Explanation</span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {finding.aiExplanation}
                      </p>
                    </div>
                  )}

                  {finding.aiImpact && (
                    <div>
                      <span className="text-xs font-semibold text-foreground/80 block mb-1">Security Impact</span>
                      <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-risk-high/30 pl-3">
                        {finding.aiImpact}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
