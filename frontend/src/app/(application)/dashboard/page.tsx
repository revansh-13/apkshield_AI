import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { DashboardContainer } from "@/app/features/dashboard/DashboardContainer";

export default function DashboardPage() {
  return (
    <PageContainer className="py-8">
      <DashboardContainer />
    </PageContainer>
  );
}
