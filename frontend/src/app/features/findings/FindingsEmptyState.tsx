import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FindingsEmptyStateProps {
  onResetFilters: () => void;
}

export function FindingsEmptyState({ onResetFilters }: FindingsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
        <SearchX className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        No findings match your filters
      </h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        Try adjusting your search term, removing some filters, or clearing all filters to see results.
      </p>
      <button
        onClick={onResetFilters}
        className={cn(
          "mt-6 rounded-xl border border-border bg-card px-6 py-2.5",
          "text-sm font-medium text-foreground",
          "hover:bg-accent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        Reset All Filters
      </button>
    </div>
  );
}
