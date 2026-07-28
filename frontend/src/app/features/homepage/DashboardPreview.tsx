"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DashboardPreview — a static mock of the real analysis dashboard.
 *
 * This component is the foundation for the /analysis/[id] dashboard
 * and is intentionally designed to match the final dashboard structure.
 * It uses no backend data — all values are hardcoded for demonstration.
 *
 * Design decisions that carry forward to the real dashboard:
 * - RiskBadge component maps severity → design system color tokens
 * - Stat card layout is the same structure as the real StatCard component
 * - Finding row structure matches the real FindingRow interface
 *
 * Client Component: required for Framer Motion animations.
 */

interface RiskBadgeProps {
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  className?: string;
}

/**
 * RiskBadge — reusable severity badge.
 * Maps risk level → design system color. Will be extracted to shared/
 * when the real dashboard (F4) is implemented.
 */
function RiskBadge({ level, className }: RiskBadgeProps) {
  const styles: Record<RiskBadgeProps["level"], string> = {
    CRITICAL: "bg-[#DC2626]/15 text-[#DC2626] border-[#DC2626]/30",
    HIGH: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30",
    MEDIUM: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
    LOW: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30",
    INFO: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        styles[level],
        className,
      )}
    >
      {level}
    </span>
  );
}

interface MockFinding {
  id: string;
  title: string;
  category: string;
  severity: RiskBadgeProps["level"];
}

const MOCK_FINDINGS: MockFinding[] = [
  {
    id: "PERM_001",
    title: "READ_SMS permission declared",
    category: "Permissions",
    severity: "HIGH",
  },
  {
    id: "MANIFEST_003",
    title: "android:debuggable=true in production",
    category: "Manifest",
    severity: "CRITICAL",
  },
  {
    id: "STR_007",
    title: "Hardcoded API key detected",
    category: "Strings",
    severity: "HIGH",
  },
  {
    id: "URL_002",
    title: "Insecure HTTP endpoint",
    category: "URLs",
    severity: "MEDIUM",
  },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" as const } },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

export function DashboardPreview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="APKShield AI dashboard preview"
      className="w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-background/40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/60" aria-hidden="true" />
        <span className="ml-3 text-[11px] text-muted-foreground font-mono">
          APKShield AI — analysis
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Risk score + level row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
              Risk Score
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold text-[#EF4444] tabular-nums">
                72
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <RiskBadge level="HIGH" />
        </div>

        {/* Stat chips */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: ShieldAlert, label: "Findings", value: "14" },
            { icon: AlertTriangle, label: "High Severity", value: "6" },
            { icon: Clock, label: "Analysis Time", value: "3.2s" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-lg border border-border bg-background/40 p-3"
            >
              <Icon
                className="w-3.5 h-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-base font-semibold text-foreground tabular-nums">
                {value}
              </span>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Findings list */}
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
            Findings
          </p>
          <motion.ul
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1.5"
            aria-label="Security findings"
          >
            {MOCK_FINDINGS.map((finding) => (
              <motion.li
                key={finding.id}
                variants={itemVariants}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/30 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {finding.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {finding.category} · {finding.id}
                  </p>
                </div>
                <RiskBadge level={finding.severity} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* AI Summary */}
        <div className="rounded-lg border border-border bg-background/30 p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles
              className="w-3.5 h-3.5 text-[#3B82F6]"
              aria-hidden="true"
            />
            <p className="text-[10px] font-medium text-foreground uppercase tracking-widest">
              AI Summary
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This application requests SMS access without clear justification and
            ships with debug mode enabled — both are high-severity production
            risks. Immediate remediation is recommended before release.
          </p>
        </div>

        {/* Export row */}
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Export analysis as JSON (demo)"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Download className="w-3 h-3" aria-hidden="true" />
            Export JSON
          </button>
        </div>

        {/* Passing checks indicator */}
        <div className="flex items-center gap-2 text-[10px] text-[#22C55E]">
          <CheckCircle className="w-3 h-3" aria-hidden="true" />
          <span>8 checks passed · 6 certificates valid</span>
        </div>
      </div>
    </motion.div>
  );
}
