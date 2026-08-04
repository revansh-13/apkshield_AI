"use client";

import * as React from "react";
import { RemediationRecommendation } from "@/shared/types/analysis";
import { RecommendationItem } from "./RecommendationItem";
import { CheckCircle } from "lucide-react";

interface RecommendationsCardProps {
  recommendations: RemediationRecommendation[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  // Default first item expanded
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(recommendations.length > 0 ? [recommendations[0].id] : [])
  );

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section aria-labelledby="recommendations-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <CheckCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h3 id="recommendations-heading" className="text-base font-semibold tracking-tight text-foreground">
          Prioritized Remediation Roadmap
        </h3>
      </div>

      <div className="space-y-3" role="list">
        {recommendations.map((rec) => (
          <div key={rec.id} role="listitem">
            <RecommendationItem
              recommendation={rec}
              isExpanded={expandedIds.has(rec.id)}
              onToggle={() => toggleExpanded(rec.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
