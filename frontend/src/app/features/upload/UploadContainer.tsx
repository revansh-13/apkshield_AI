"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "./UploadDropzone";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import { ValidationMessage } from "./ValidationMessage";
import { cn } from "@/lib/utils";
import { useAnalysisStore } from "@/store/useAnalysisStore";

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
const ALLOWED_EXTENSIONS = [".apk"];

export function UploadContainer() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const { uploadStatus, uploadProgress, currentError, uploadApk, cancelUpload, resetState } = useAnalysisStore();

  const handleFileSelect = (file: File) => {
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(extension) && file.type !== "application/vnd.android.package-archive") {
      setLocalError("Invalid file type. Please upload a valid Android APK file (.apk).");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setLocalError(`File too large. Maximum size is 100MB.`);
      return;
    }

    setLocalError(null);
    setSelectedFile(file);
    resetState();
  };

  const handleRemoveFile = () => {
    cancelUpload();
    setSelectedFile(null);
    setLocalError(null);
  };

  const handleStartUpload = async () => {
    if (!selectedFile) return;
    await uploadApk(selectedFile);
  };

  // When upload status is success, we can navigate to dashboard
  React.useEffect(() => {
    if (uploadStatus === "success") {
      router.push("/dashboard");
    }
  }, [uploadStatus, router]);

  // Aggregate errors
  const activeError = localError || currentError;
  const isIdleOrError = uploadStatus === "idle" || uploadStatus === "error";

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Dropzone is visible when no file is selected */}
      {!selectedFile && (
        <>
          <UploadDropzone onFileSelect={handleFileSelect} />
          {activeError && (
            <ValidationMessage message={activeError} />
          )}
        </>
      )}

      {/* File Preview and Progress/Actions visible otherwise */}
      {selectedFile && (
        <div className="flex flex-col gap-4">
          <FilePreview 
            file={selectedFile} 
            onRemove={handleRemoveFile} 
            isUploading={uploadStatus === "uploading" || uploadStatus === "processing"}
          />
          
          {isIdleOrError && (
            <button
              onClick={handleStartUpload}
              className={cn(
                "w-full rounded-xl bg-primary text-primary-foreground py-3 px-4 font-semibold",
                "transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {uploadStatus === "error" ? "Try Again" : "Analyze APK"}
            </button>
          )}

          {uploadStatus === "uploading" && (
            <div className="flex flex-col gap-2">
              <UploadProgress progress={uploadProgress} />
              <button
                disabled
                className="w-full rounded-xl bg-primary/50 text-primary-foreground/50 py-3 px-4 font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Uploading ({uploadProgress}%)...
              </button>
              <button
                onClick={handleRemoveFile}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Cancel Upload
              </button>
            </div>
          )}

          {uploadStatus === "processing" && (
            <div className="flex flex-col gap-2">
              <UploadProgress progress={100} />
              <button
                disabled
                className="w-full rounded-xl bg-primary/50 text-primary-foreground/50 py-3 px-4 font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing APK... Running risk engine and AI summary...
              </button>
            </div>
          )}

          {uploadStatus === "error" && activeError && (
            <div className="flex flex-col gap-3 mt-2">
              <ValidationMessage message={activeError} />
            </div>
          )}
        </div>
      )}
      
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {localError && `Error: ${localError}`}
        {currentError && `Error: ${currentError}`}
        {selectedFile && isIdleOrError && `File ${selectedFile.name} selected. Ready to analyze.`}
        {uploadStatus === "uploading" && `Uploading file. Progress: ${Math.round(uploadProgress)}%`}
        {uploadStatus === "processing" && "Upload complete. Analyzing file..."}
        {uploadStatus === "success" && "Analysis complete. Navigating to dashboard."}
      </div>
    </div>
  );
}
