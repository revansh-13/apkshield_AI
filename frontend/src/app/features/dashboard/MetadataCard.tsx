import { AnalysisMetadata } from "@/shared/types/analysis";
import { Package, Hash, Calendar, Cpu } from "lucide-react";

import { formatDeterministicDate } from "@/lib/date";

interface MetadataCardProps {
  metadata: AnalysisMetadata;
}

export function MetadataCard({ metadata }: MetadataCardProps) {
  const date = formatDeterministicDate(metadata.timestamp);

  return (
    <section aria-labelledby="metadata-heading" className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h2 id="metadata-heading" className="sr-only">Analysis Metadata</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* App Info */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-foreground truncate" title={metadata.packageName}>
              {metadata.packageName}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5 truncate" title={metadata.apkName}>
              {metadata.apkName}
            </span>
          </div>
        </div>

        {/* Version & SDK */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Cpu className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              v{metadata.versionName} ({metadata.versionCode})
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              Target SDK: {metadata.targetSdk} • Min SDK: {metadata.minSdk}
            </span>
          </div>
        </div>

        {/* Timestamp & Size */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {date}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5">
              {metadata.fileSizeMb} MB
            </span>
          </div>
        </div>

      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground font-mono truncate">
        <Hash className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span className="truncate" title={metadata.sha256}>SHA-256: {metadata.sha256}</span>
      </div>
    </section>
  );
}
