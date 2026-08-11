import { Sparkles, Bot } from "lucide-react";
import { AI_MODEL_NAME } from "./constants";

import { formatDeterministicDate } from "@/lib/date";

interface AIReportHeaderProps {
  apkName: string;
  timestamp: string;
}

export function AIReportHeader({ apkName, timestamp }: AIReportHeaderProps) {
  const formattedDate = formatDeterministicDate(timestamp);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            AI Security Report
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Analysis for <span className="font-mono text-foreground">{apkName}</span> • {formattedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto rounded-full bg-primary/5 px-3 py-1.5 border border-primary/20 text-xs font-medium text-primary">
        <Bot className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{AI_MODEL_NAME}</span>
      </div>
    </div>
  );
}
