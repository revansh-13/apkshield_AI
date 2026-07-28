"use client";

import { motion } from "framer-motion";
import { Severity } from "@/shared/types/analysis";
import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number; // 0-100
  level: Severity;
}

const severityConfig: Record<Severity, { colorClass: string; label: string }> = {
  critical: { colorClass: "text-risk-critical", label: "CRITICAL" },
  high: { colorClass: "text-risk-high", label: "HIGH" },
  medium: { colorClass: "text-risk-medium", label: "MEDIUM" },
  low: { colorClass: "text-risk-low", label: "LOW" },
  info: { colorClass: "text-risk-info", label: "INFO" },
};

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const config = severityConfig[level];
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Score is 0-100, where 100 means full ring (max risk)
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div 
      className="relative flex items-center justify-center"
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Risk score: ${score} out of 100. Level: ${config.label}`}
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="transform -rotate-90"
      >
        {/* Background Track */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        {/* Animated Progress Ring */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={config.colorClass}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Center Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight text-foreground">
          {score}
        </span>
        <span className={cn("text-xs font-bold uppercase tracking-widest mt-1", config.colorClass)}>
          {config.label}
        </span>
      </div>
    </div>
  );
}
