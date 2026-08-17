"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { PageHeader } from "@/app/shared/components/ui/PageHeader";
import { EmptyState } from "@/app/shared/components/ui/EmptyState";
import { History as HistoryIcon, Loader2, Trash2, ArrowRight } from "lucide-react";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { SEVERITY_LABELS } from "@/app/features/findings/constants";

export default function HistoryPage() {
  const router = useRouter();
  const { historyList, historyStatus, fetchHistory, deleteHistoricalAnalysis } = useAnalysisStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this analysis?")) {
      setDeletingId(id);
      try {
        await deleteHistoricalAnalysis(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const renderContent = () => {
    if (historyStatus === "loading" && historyList.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (historyList.length === 0) {
      return (
        <EmptyState
          title="No History Found"
          description="You haven't analyzed any APKs yet. Upload an APK to see it here."
          icon={HistoryIcon}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {historyList.map((item) => (
          <div
            key={item.analysis_id}
            onClick={() => router.push(`/history/${item.analysis_id}`)}
            className="group relative flex flex-col justify-between p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-foreground truncate pr-4" title={item.apkName}>
                  {item.apkName}
                </h3>
                <div className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider
                  ${item.riskLevel === 'critical' ? 'bg-risk-critical/10 text-risk-critical border border-risk-critical/20' : ''}
                  ${item.riskLevel === 'high' ? 'bg-risk-high/10 text-risk-high border border-risk-high/20' : ''}
                  ${item.riskLevel === 'medium' ? 'bg-risk-medium/10 text-risk-medium border border-risk-medium/20' : ''}
                  ${item.riskLevel === 'low' ? 'bg-risk-low/10 text-risk-low border border-risk-low/20' : ''}
                  ${item.riskLevel === 'info' ? 'bg-risk-info/10 text-risk-info border border-risk-info/20' : ''}
                `}>
                  {SEVERITY_LABELS[item.riskLevel as keyof typeof SEVERITY_LABELS] || item.riskLevel}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Score: <span className="font-medium text-foreground">{item.riskScore}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Findings: <span className="font-medium text-foreground">{item.totalFindings}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Analyzed: {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center border-t border-border pt-4">
              <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                View Analysis <ArrowRight className="ml-1 h-4 w-4" />
              </span>
              <button
                onClick={(e) => handleDelete(e, item.analysis_id)}
                disabled={deletingId === item.analysis_id}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                title="Delete Analysis"
              >
                {deletingId === item.analysis_id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Analysis History" 
        description="Review past scans, track remediation progress, and compare historical findings."
      />
      {renderContent()}
    </PageContainer>
  );
}
