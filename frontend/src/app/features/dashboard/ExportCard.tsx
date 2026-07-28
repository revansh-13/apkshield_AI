import { FileJson, FileText, Download, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExportCard() {
  const exportOptions = [
    { label: "Export PDF", icon: FileText, desc: "Executive summary & charts" },
    { label: "Export JSON", icon: FileJson, desc: "Raw analysis data" },
    { label: "Export SARIF", icon: Code, desc: "CI/CD integration" },
  ];

  return (
    <section aria-labelledby="export-heading" className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Download className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h2 id="export-heading" className="text-lg font-semibold tracking-tight text-foreground">
          Export Report
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {exportOptions.map((opt) => (
          <button
            key={opt.label}
            disabled
            className={cn(
              "group flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/50 p-4",
              "cursor-not-allowed opacity-70 transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={`${opt.label} (Available in future release)`}
          >
            <opt.icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
            <span className="text-xs text-muted-foreground text-center">{opt.desc}</span>
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-xs text-center text-muted-foreground">
        Export functionality will be available after backend integration (F2.7).
      </p>
    </section>
  );
}
