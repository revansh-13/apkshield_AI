"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ShieldAlert,
  Layers,
  Globe,
  BadgeCheck,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURE_CARDS } from "@/constants/site";
import type { FeatureCard } from "@/constants/site";
import type { LucideIcon } from "lucide-react";

/**
 * FeatureGrid — six-card grid displaying APKShield's analysis categories.
 *
 * Responsibilities:
 * - Render one card per analysis category (Manifest, Permissions, etc.)
 * - Animate cards into view on scroll using whileInView stagger
 * - Responsive: 3-col desktop → 2-col tablet → 1-col mobile
 *
 * Client Component: required for Framer Motion scroll-triggered animations.
 */

/** Maps iconName strings from constants to Lucide components. */
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  ShieldAlert,
  Layers,
  Globe,
  BadgeCheck,
  KeyRound,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

interface FeatureCardItemProps {
  card: FeatureCard;
}

function FeatureCardItem({ card }: FeatureCardItemProps) {
  const Icon = ICON_MAP[card.iconName] ?? FileText;

  return (
    <motion.article
      variants={cardVariants}
      aria-labelledby={`feature-${card.id}-title`}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6",
        "transition-colors duration-200 hover:border-foreground/20 hover:bg-card/80",
      )}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background border border-border group-hover:border-foreground/20 transition-colors">
        <Icon
          className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
          aria-hidden="true"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3
          id={`feature-${card.id}-title`}
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

export function FeatureGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* Section header */}
      <div className="flex flex-col gap-3 mb-12">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Analysis Categories
        </p>
        <h2
          id="features-heading"
          className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
        >
          Six layers of security coverage
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          Every APK is analysed across six distinct attack surfaces using
          deterministic, rule-based logic — no black boxes.
        </p>
      </div>

      {/* Card grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="Analysis feature categories"
      >
        {FEATURE_CARDS.map((card) => (
          <FeatureCardItem key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  );
}
