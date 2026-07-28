"use client";

import * as React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadDropzone({ onFileSelect, disabled = false }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
      // Reset input so selecting the same file again triggers change event
      e.target.value = '';
    }
  };

  return (
    <div
      className={cn(
        "relative group flex flex-col items-center justify-center p-12 text-center mt-4",
        "rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-accent/50 bg-card",
        disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-card"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !disabled && fileInputRef.current?.click()}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      aria-label="File upload dropzone"
      aria-disabled={disabled}
    >
      <div className="flex flex-col items-center gap-3 pointer-events-none">
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
          isDragging ? "bg-primary/20" : "bg-muted group-hover:bg-primary/10"
        )}>
          <UploadCloud 
            className={cn(
              "h-6 w-6 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )} 
            aria-hidden="true" 
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
          </p>
          <p className="text-xs text-muted-foreground">
            APK files only (max. 100MB)
          </p>
        </div>
      </div>
      
      {/* Hidden file input for accessibility and click-to-upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".apk,application/vnd.android.package-archive"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
        aria-label="Choose APK file to upload"
      />
    </div>
  );
}
