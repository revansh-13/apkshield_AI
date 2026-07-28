"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WHY_CARDS } from "@/constants/site";
import type { WhyCard } from "@/constants/site";
import type { LucideIcon } from "lucide-react";

/**
 * WhySection — three-card row explaining APKShield's core value propositions.
 *
 * Responsibilities:
 * - Render Deterministic Analysis, AI Explanations, Modular Architecture cards
 * - Animate cards into view on scroll
 *
 * Client Component: required for Framer Motion.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  CheckCircle,
  Sparkles,
  GitBranch,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

interface WhyCardItemProps {
  card: WhyCard;
}

function WhyCardItem({ card }: WhyCardItemProps) {
  const Icon = ICON_MAP[card.iconName] ?? CheckCircle;

  return (
    <motion.article
      variants={cardVariants}
      aria-labelledby={`why-${card.id}-title`}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-border bg-card p-6",
        "transition-colors duration-200 hover:border-foreground/20",
      )}
    >
      <Icon
        className="w-5 h-5 text-muted-foreground"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <h3
          id={`why-${card.id}-title`}
          className="text-sm font-semibold text-foreground"
        >
          {card.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* Section header */}
      <div className="flex flex-col gap-3 mb-12">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Why APKShield AI
        </p>
        <h2
          id="why-heading"
          className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
        >
          Built for engineers, readable by anyone
        </h2>
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        aria-label="Why choose APKShield AI"
      >
        {WHY_CARDS.map((card) => (
          <WhyCardItem key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  );
}
