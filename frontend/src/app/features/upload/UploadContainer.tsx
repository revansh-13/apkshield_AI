"use client";

import * as React from "react";
import { UploadDropzone } from "./UploadDropzone";
import { FilePreview } from "./FilePreview";
import { UploadProgress } from "./UploadProgress";
import { ValidationMessage } from "./ValidationMessage";
import { cn } from "@/lib/utils";

// 1. Define State & Actions for the State Machine
type UploadState = 
  | "IDLE" 
  | "FILE_SELECTED" 
  | "INVALID_FILE" 
  | "UPLOADING" 
  | "UPLOAD_SUCCESS" 
  | "UPLOAD_ERROR";

interface State {
  status: UploadState;
  file: File | null;
  errorMsg: string | null;
  progress: number;
}

type Action =
  | { type: "SELECT_VALID_FILE"; payload: File }
  | { type: "SELECT_INVALID_FILE"; payload: string }
  | { type: "REMOVE_FILE" }
  | { type: "START_UPLOAD" }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "UPLOAD_COMPLETE" }
  | { type: "UPLOAD_FAILED"; payload: string }
  | { type: "RETRY_UPLOAD" };

const initialState: State = {
  status: "IDLE",
  file: null,
  errorMsg: null,
  progress: 0,
};

// 2. Reducer Function (Finite State Machine transitions)
function uploadReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_VALID_FILE":
      return { ...state, status: "FILE_SELECTED", file: action.payload, errorMsg: null, progress: 0 };
    case "SELECT_INVALID_FILE":
      return { ...state, status: "INVALID_FILE", file: null, errorMsg: action.payload, progress: 0 };
    case "REMOVE_FILE":
      return { ...initialState };
    case "START_UPLOAD":
      if (state.status !== "FILE_SELECTED" || !state.file) return state;
      return { ...state, status: "UPLOADING", progress: 0, errorMsg: null };
    case "SET_PROGRESS":
      if (state.status !== "UPLOADING") return state;
      return { ...state, progress: action.payload };
    case "UPLOAD_COMPLETE":
      if (state.status !== "UPLOADING") return state;
      return { ...state, status: "UPLOAD_SUCCESS", progress: 100 };
    case "UPLOAD_FAILED":
      if (state.status !== "UPLOADING") return state;
      return { ...state, status: "UPLOAD_ERROR", errorMsg: action.payload, progress: 0 };
    case "RETRY_UPLOAD":
      if (state.status !== "UPLOAD_ERROR") return state;
      return { ...state, status: "FILE_SELECTED", errorMsg: null, progress: 0 };
    default:
      return state;
  }
}

// 3. Constants for validation
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
const ALLOWED_EXTENSIONS = [".apk"];

export function UploadContainer() {
  const [state, dispatch] = React.useReducer(uploadReducer, initialState);

  // 4. File Validation Logic
  const handleFileSelect = (file: File) => {
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(extension) && file.type !== "application/vnd.android.package-archive") {
      dispatch({ 
        type: "SELECT_INVALID_FILE", 
        payload: "Invalid file type. Please upload a valid Android APK file (.apk)." 
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      dispatch({ 
        type: "SELECT_INVALID_FILE", 
        payload: `File too large. Maximum size is 100MB.` 
      });
      return;
    }

    dispatch({ type: "SELECT_VALID_FILE", payload: file });
  };

  // 5. Mock Upload Progress Logic
  React.useEffect(() => {
    if (state.status === "UPLOADING") {
      const totalDurationMs = 2000;
      const intervalMs = 50;
      const steps = totalDurationMs / intervalMs;
      const increment = 100 / steps;

      const timer = setInterval(() => {
        dispatch({ type: "SET_PROGRESS", payload: increment });
      }, intervalMs);

      const timeout = setTimeout(() => {
        clearInterval(timer);
        dispatch({ type: "UPLOAD_COMPLETE" });
      }, totalDurationMs);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [state.status]);

  // If using Redux-like thunk patterns, the actual SET_PROGRESS dispatch might 
  // read from previous state. In our useEffect, `increment` is fixed, but 
  // SET_PROGRESS needs to accumulate. Wait, uploadReducer SET_PROGRESS overwrites.
  // We need to fix SET_PROGRESS to accumulate, or pass the absolute value.
  // Let's modify the useEffect to track the local progress value.
  
  React.useEffect(() => {
    let currentProgress = 0;
    if (state.status === "UPLOADING") {
      const totalDurationMs = 2000;
      const intervalMs = 50;
      const steps = totalDurationMs / intervalMs;
      const increment = 100 / steps;

      const timer = setInterval(() => {
        currentProgress += increment;
        if (currentProgress > 100) currentProgress = 100;
        dispatch({ type: "SET_PROGRESS", payload: currentProgress });
      }, intervalMs);

      const timeout = setTimeout(() => {
        clearInterval(timer);
        dispatch({ type: "UPLOAD_COMPLETE" });
      }, totalDurationMs);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [state.status]);

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* Dropzone is visible when IDLE or INVALID_FILE */}
      {(state.status === "IDLE" || state.status === "INVALID_FILE") && (
        <>
          <UploadDropzone onFileSelect={handleFileSelect} />
          {state.status === "INVALID_FILE" && state.errorMsg && (
            <ValidationMessage message={state.errorMsg} />
          )}
        </>
      )}

      {/* File Preview and Progress/Actions visible otherwise */}
      {state.status !== "IDLE" && state.status !== "INVALID_FILE" && state.file && (
        <div className="flex flex-col gap-4">
          <FilePreview 
            file={state.file} 
            onRemove={() => dispatch({ type: "REMOVE_FILE" })} 
            isUploading={state.status === "UPLOADING" || state.status === "UPLOAD_SUCCESS"}
          />
          
          {state.status === "FILE_SELECTED" && (
            <button
              onClick={() => dispatch({ type: "START_UPLOAD" })}
              className={cn(
                "w-full rounded-xl bg-primary text-primary-foreground py-3 px-4 font-semibold",
                "transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Analyze APK
            </button>
          )}

          {state.status === "UPLOADING" && (
            <div className="flex flex-col gap-2">
              <UploadProgress progress={state.progress} />
              <button
                disabled
                className="w-full rounded-xl bg-primary/50 text-primary-foreground/50 py-3 px-4 font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </button>
            </div>
          )}

          {state.status === "UPLOAD_SUCCESS" && (
            <div className="flex flex-col gap-4 items-center justify-center py-6 bg-primary/5 rounded-xl border border-primary/20">
              <div className="text-center space-y-1">
                <p className="font-semibold text-primary">Upload Complete</p>
                <p className="text-sm text-muted-foreground">Ready for analysis. Backend integration arriving in F2.7.</p>
              </div>
              <button
                disabled
                className="rounded-xl bg-muted text-muted-foreground py-2 px-6 font-medium cursor-not-allowed border border-border"
              >
                View Dashboard (Coming in F2.7)
              </button>
            </div>
          )}

          {state.status === "UPLOAD_ERROR" && state.errorMsg && (
            <div className="flex flex-col gap-3">
              <ValidationMessage message={state.errorMsg} />
              <button
                onClick={() => dispatch({ type: "RETRY_UPLOAD" })}
                className="w-full rounded-xl border border-border bg-card hover:bg-accent text-foreground py-3 px-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {state.status === "INVALID_FILE" && `Error: ${state.errorMsg}`}
        {state.status === "FILE_SELECTED" && `File ${state.file?.name} selected. Ready to analyze.`}
        {state.status === "UPLOADING" && `Uploading file. Progress: ${Math.round(state.progress)}%`}
        {state.status === "UPLOAD_SUCCESS" && "Upload complete. Ready for analysis."}
      </div>
    </div>
  );
}
