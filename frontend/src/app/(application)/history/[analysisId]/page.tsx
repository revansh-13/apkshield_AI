"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAnalysisStore } from "@/store/useAnalysisStore";

export default function HistoricalAnalysisLoader({
  params,
}: {
  params: { analysisId: string };
}) {
  const router = useRouter();
  const { loadHistoricalAnalysis, currentError } = useAnalysisStore();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Prevent double-loading in StrictMode
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    async function load() {
      try {
        await loadHistoricalAnalysis(params.analysisId);
        // On success, redirect to the dashboard which will now show this historical analysis
        router.push("/dashboard");
      } catch {
        // Error will be caught and reflected in currentError in the store,
        // but we want to show it on this page.
      }
    }
    
    load();
  }, [params.analysisId, loadHistoricalAnalysis, router]);

  if (currentError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="text-destructive font-semibold text-lg">Error Loading Analysis</div>
        <p className="text-muted-foreground">{currentError}</p>
        <button 
          onClick={() => router.push("/history")}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Return to History
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">Loading historical analysis...</p>
    </div>
  );
}
