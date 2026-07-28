import { FileBox, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  isUploading: boolean;
}

export function FilePreview({ file, onRemove, isUploading }: FilePreviewProps) {
  // Format bytes to MB
  const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/50 mt-4">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border shadow-sm">
          <FileBox className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col overflow-hidden text-left">
          <span className="text-sm font-medium text-foreground truncate" title={file.name}>
            {file.name}
          </span>
          <span className="text-xs text-muted-foreground mt-0.5">
            {sizeInMB} MB • APK
          </span>
        </div>
      </div>
      
      {!isUploading && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Remove selected file"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
