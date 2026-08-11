"use client";

import { useRouter } from "next/navigation";
import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { FindingsExplorer } from "@/app/features/findings/FindingsExplorer";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useHasHydrated } from "@/hooks/useHasHydrated";
import { FileQuestion } from "lucide-react";

export default function FindingsPage() {
  const { currentAnalysis } = useAnalysisStore();
  const hasHydrated = useHasHydrated();
  const router = useRouter();

  // Force null during SSR/initial hydration to match server output
  const data = hasHydrated ? currentAnalysis : null;

  if (!data) {
    return (
      <PageContainer className="py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto text-center gap-6">
          <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center border border-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">No Findings Available</h2>
            <p className="text-muted-foreground">
              You haven&apos;t uploaded an APK yet or the previous analysis session has expired. 
              Please upload a new file to explore findings.
            </p>
          </div>
          <button
            onClick={() => router.push("/upload")}
            className="mt-4 rounded-xl bg-primary text-primary-foreground py-3 px-8 font-semibold transition-colors hover:bg-primary/90"
          >
            Upload APK
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      <div className="max-w-5xl mx-auto w-full">
        <FindingsExplorer findings={data.findings} />
      </div>
    </PageContainer>
  );
}
