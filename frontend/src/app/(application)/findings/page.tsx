import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { FindingsExplorer } from "@/app/features/findings/FindingsExplorer";
import { MOCK_ANALYSIS_RESULT } from "@/mocks/analysis-data";

export default function FindingsPage() {
  return (
    <PageContainer className="py-8">
      <div className="max-w-5xl mx-auto w-full">
        <FindingsExplorer findings={MOCK_ANALYSIS_RESULT.findings} />
      </div>
    </PageContainer>
  );
}
