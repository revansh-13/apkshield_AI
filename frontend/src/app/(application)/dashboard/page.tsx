import { PageContainer } from "@/app/shared/components/ui/PageContainer";
import { PageHeader } from "@/app/shared/components/ui/PageHeader";
import { EmptyState } from "@/app/shared/components/ui/EmptyState";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your recent APK security analyses and risk trends."
      />
      <EmptyState
        title="No Analyses Found"
        description="You haven't analyzed any APKs yet. Upload your first APK to generate a comprehensive security dashboard and view your risk profile."
        icon={LayoutDashboard}
      >
        <Link
          href="/upload"
          className={cn(
            "inline-flex items-center justify-center gap-2",
            "rounded-xl bg-primary text-primary-foreground",
            "px-6 py-3 text-sm font-semibold",
            "transition-colors hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          Upload APK
        </Link>
      </EmptyState>
    </PageContainer>
  );
}
