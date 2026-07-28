import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

interface UploadCardProps {
  children: React.ReactNode;
  className?: string;
}

export function UploadCard({ children, className }: UploadCardProps) {
  return (
    <div className={cn("mx-auto max-w-2xl w-full", className)}>
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
            <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            New Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload an Android APK file to begin a comprehensive security scan.
          </p>
        </div>
        
        {children}
        
        <div className="rounded-lg bg-muted p-4 border border-border">
          <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
            What gets analyzed?
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Manifest configurations and permissions</li>
            <li>Exposed components and intent filters</li>
            <li>Hardcoded URLs, endpoints, and secrets</li>
            <li>Signature and certificate strength</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
