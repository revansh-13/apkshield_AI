import { ApplicationLayout } from "@/app/shared/components/layout/ApplicationLayout";

export default function AppRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApplicationLayout>{children}</ApplicationLayout>;
}
