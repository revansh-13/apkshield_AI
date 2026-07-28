import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { UploadCard } from "@/app/features/upload/UploadCard";
import { UploadContainer } from "@/app/features/upload/UploadContainer";

export default function UploadPage() {
  return (
    <PageContainer className="flex items-center justify-center py-12 md:py-24">
      <UploadCard>
        <UploadContainer />
      </UploadCard>
    </PageContainer>
  );
}
