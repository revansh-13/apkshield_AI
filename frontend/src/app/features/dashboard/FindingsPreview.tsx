import { Finding } from "@/shared/types/analysis";
import { FindingRow } from "./FindingRow";
import { ArrowRight, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface FindingsPreviewProps {
  findings: Finding[];
}

export function FindingsPreview({ findings }: FindingsPreviewProps) {
  // Sort findings by severity logically (critical -> info)
  const severityWeight = { critical: 5, high: 4, medium: 3, low: 2, info: 1 };
  const sortedFindings = [...findings].sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity]);
  
  // Take top 5 for the preview
  const previewFindings = sortedFindings.slice(0, 5);

  return (
    <section aria-labelledby="findings-heading" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 id="findings-heading" className="text-lg font-semibold tracking-tight text-foreground">
            Top Findings Preview
          </h2>
        </div>
        <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
          Showing {previewFindings.length} of {findings.length}
        </span>
      </div>

      <div className="flex flex-col gap-3" role="list">
        {previewFindings.map((finding) => (
          <FindingRow key={finding.id} finding={finding} />
        ))}
      </div>

      <button
        disabled
        className={cn(
          "group mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card p-4",
          "text-sm font-medium text-muted-foreground cursor-not-allowed transition-colors"
        )}
        aria-label="View all findings (Available in future release)"
      >
        View All {findings.length} Findings (Findings Explorer coming in F2.5)
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
