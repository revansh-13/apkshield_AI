import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex-1 p-4 md:p-8 pt-6", className)}>
      <div className="mx-auto max-w-6xl w-full">
        {children}
      </div>
    </div>
  );
}
