import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { PageHeader } from "@/app/shared/components/ui/PageHeader";
import { EmptyState } from "@/app/shared/components/ui/EmptyState";
import { History as HistoryIcon } from "lucide-react";

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Analysis History" 
        description="Review past scans, track remediation progress, and compare historical findings."
      />
      <EmptyState
        title="History Unavailable"
        description="The historical tracking feature is currently in development. In a future release, this page will list all your past analyses with exportable reports."
        icon={HistoryIcon}
      />
    </PageContainer>
  );
}
