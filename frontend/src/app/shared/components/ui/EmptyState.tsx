import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon, className, children }: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        "min-h-[400px] rounded-xl border border-dashed border-border bg-card/50",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
