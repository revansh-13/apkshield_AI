"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants/site";
import { DashboardPreview } from "./DashboardPreview";

/**
 * HeroSection — the primary above-the-fold section.
 *
 * Responsibilities:
 * - Headline, subtitle, and dual CTA buttons
 * - Side-by-side layout with DashboardPreview on desktop
 * - Framer Motion fade-in + slide-up on mount
 *
 * Client Component: required for Framer Motion.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-16"
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#27272A_1px,transparent_1px),linear-gradient(to_bottom,#27272A_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 pointer-events-none"
      />
      {/* Radial fade over grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,#09090B_100%)] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                AI-Powered Android Security Analysis
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
            >
              Understand Android APK Security{" "}
              <span className="text-muted-foreground">in Minutes</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              {SITE.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link
                href="/upload"
                id="hero-cta-primary"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "rounded-xl bg-primary text-primary-foreground",
                  "px-6 py-3 text-sm font-semibold",
                  "transition-colors hover:bg-primary/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                Analyze APK
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href={SITE.githubUrl}
                id="hero-cta-secondary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View APKShield AI on GitHub (opens in new tab)"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "rounded-xl border border-border bg-transparent text-foreground",
                  "px-6 py-3 text-sm font-medium",
                  "transition-colors hover:bg-card",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                View GitHub
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Preview */}
          <div className="lg:max-w-lg w-full mx-auto lg:mx-0">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
