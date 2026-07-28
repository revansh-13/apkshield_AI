import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { PageHeader } from "@/app/shared/components/ui/PageHeader";
import { EmptyState } from "@/app/shared/components/ui/EmptyState";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Settings" 
        description="Configure analysis rules, API keys, and notification preferences."
      />
      <EmptyState
        title="Configuration Not Available"
        description="Global settings and custom rule configurations are planned for a future update. For now, analysis uses the default recommended ruleset."
        icon={SettingsIcon}
      />
    </PageContainer>
  );
}
