import { FileText } from "lucide-react";

interface ExecutiveSummaryCardProps {
  summary: string;
}

export function ExecutiveSummaryCard({ summary }: ExecutiveSummaryCardProps) {
  return (
    <section aria-labelledby="executive-summary-heading" className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 id="executive-summary-heading" className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Executive Summary
        </h3>
      </div>
      <p className="text-sm text-foreground leading-relaxed">
        {summary}
      </p>
    </section>
  );
}
