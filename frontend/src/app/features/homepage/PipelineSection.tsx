"use client";

import { motion } from "framer-motion";
import {
  Upload,
  ScanSearch,
  Cpu,
  BrainCircuit,
  LayoutDashboard,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PIPELINE_STEPS } from "@/constants/site";
import type { PipelineStep } from "@/constants/site";
import type { LucideIcon } from "lucide-react";

/**
 * PipelineSection — animated backend pipeline diagram.
 *
 * Displays each processing stage (APK → Parser → Risk Engine → AI Engine → Dashboard)
 * as a vertical sequence of cards connected by animated arrows.
 * Each step animates into view sequentially on scroll.
 *
 * Client Component: required for Framer Motion scroll-triggered animations.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  Upload,
  ScanSearch,
  Cpu,
  BrainCircuit,
  LayoutDashboard,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

interface PipelineStepItemProps {
  step: PipelineStep;
  isLast: boolean;
  index: number;
}

function PipelineStepItem({ step, isLast, index }: PipelineStepItemProps) {
  const Icon = ICON_MAP[step.iconName] ?? Upload;
  const isFirst = index === 0;

  return (
    <div className="flex flex-col items-center">
      {/* Step card */}
      <motion.div
        variants={stepVariants}
        aria-label={`Step ${index + 1}: ${step.label}`}
        className={cn(
          "flex items-start gap-4 w-full max-w-sm rounded-2xl border border-border bg-card px-5 py-4",
          isFirst && "border-foreground/20",
        )}
      >
        {/* Step number + icon */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-background border border-border">
            <Icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <span className="text-[9px] text-muted-foreground tabular-nums font-mono">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-0.5 pt-1">
          <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Connector arrow */}
      {!isLast && (
        <motion.div
          variants={arrowVariants}
          className="flex flex-col items-center py-2 origin-top"
          aria-hidden="true"
        >
          <div className="w-px h-6 bg-border" />
          <ArrowDown className="w-3 h-3 text-border -mt-0.5" />
        </motion.div>
      )}
    </div>
  );
}

export function PipelineSection() {
  return (
    <section
      id="pipeline"
      aria-labelledby="pipeline-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            How it Works
          </p>
          <h2
            id="pipeline-heading"
            className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
          >
            A transparent, layered pipeline
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            APKShield processes your file through a deterministic pipeline. Each
            stage has a single responsibility, producing verifiable,
            auditable output before passing it to the next layer.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            The AI layer receives structured findings — it explains them, not
            invent them. This separation ensures every flag is traceable to a
            specific rule.
          </p>
        </div>

        {/* Right — animated pipeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col items-center"
          aria-label="Processing pipeline steps"
        >
          {PIPELINE_STEPS.map((step, index) => (
            <PipelineStepItem
              key={step.id}
              step={step}
              isLast={index === PIPELINE_STEPS.length - 1}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
