"use client";

import * as React from "react";
import { Copy, Check, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  onCopyReport: () => void;
}

export function ActionCard({ onCopyReport }: ActionCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    onCopyReport();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="text-xs text-muted-foreground">
        Export or copy the executive AI analysis summary for stakeholders.
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={handleCopy}
          className={cn(
            "flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            copied
              ? "bg-risk-low text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy AI Report
            </>
          )}
        </button>

        <button
          disabled
          aria-label="Download PDF Report (Coming in F2.7)"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground opacity-60 cursor-not-allowed"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          PDF (F2.7)
        </button>

        <button
          disabled
          aria-label="Download Markdown Report (Coming in F2.7)"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground opacity-60 cursor-not-allowed"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          MD (F2.7)
        </button>
      </div>

      {/* Screen reader notification */}
      <div aria-live="polite" className="sr-only">
        {copied && "AI Report content successfully copied to clipboard."}
      </div>
    </div>
  );
}
