"use client";

import { Finding } from "@/shared/types/analysis";
import { useFindingsFilter } from "./useFindingsFilter";
import { FindingsToolbar } from "./FindingsToolbar";
import { FindingCard } from "./FindingCard";
import { FindingsEmptyState } from "./FindingsEmptyState";
import { SEVERITY_LABELS } from "./constants";
import { X, FileSearch } from "lucide-react";

// ── Active Filter Chips ───────────────────────────────────

interface FilterChipsProps {
  searchTerm: string;
  selectedSeverities: Set<string>;
  selectedCategories: Set<string>;
  onRemoveSearch: () => void;
  onToggleSeverity: (severity: string) => void;
  onToggleCategory: (category: string) => void;
  onResetFilters: () => void;
}

function FilterChips({
  searchTerm,
  selectedSeverities,
  selectedCategories,
  onRemoveSearch,
  onToggleSeverity,
  onToggleCategory,
  onResetFilters,
}: FilterChipsProps) {
  const hasFilters = searchTerm.trim().length > 0 || selectedSeverities.size > 0 || selectedCategories.size > 0;
  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search chip */}
      {searchTerm.trim() && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent border border-border px-3 py-1 text-xs font-medium text-foreground">
          &ldquo;{searchTerm.trim()}&rdquo;
          <button
            onClick={onRemoveSearch}
            aria-label={`Remove search filter: ${searchTerm}`}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </span>
      )}

      {/* Severity chips */}
      {Array.from(selectedSeverities).map((sev) => (
        <span
          key={sev}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent border border-border px-3 py-1 text-xs font-medium text-foreground"
        >
          {SEVERITY_LABELS[sev as keyof typeof SEVERITY_LABELS] ?? sev}
          <button
            onClick={() => onToggleSeverity(sev)}
            aria-label={`Remove severity filter: ${sev}`}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </span>
      ))}

      {/* Category chips */}
      {Array.from(selectedCategories).map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent border border-border px-3 py-1 text-xs font-medium text-foreground"
        >
          {cat}
          <button
            onClick={() => onToggleCategory(cat)}
            aria-label={`Remove category filter: ${cat}`}
            className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </span>
      ))}

      {/* Clear all */}
      <button
        onClick={onResetFilters}
        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 py-0.5"
      >
        Clear All
      </button>
    </div>
  );
}

// ── Main Explorer ─────────────────────────────────────────

interface FindingsExplorerProps {
  findings: Finding[];
}

export function FindingsExplorer({ findings }: FindingsExplorerProps) {
  const {
    searchTerm,
    selectedSeverities,
    selectedCategories,
    sortOption,
    expandedIds,
    filteredFindings,
    totalCount,
    setSearch,
    removeSearch,
    toggleSeverity,
    toggleCategory,
    setSortOption,
    toggleExpanded,
    resetFilters,
  } = useFindingsFilter(findings);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FileSearch className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Findings Explorer
        </h1>
      </div>

      {/* Sticky Toolbar */}
      <FindingsToolbar
        searchTerm={searchTerm}
        selectedSeverities={selectedSeverities}
        selectedCategories={selectedCategories}
        sortOption={sortOption}
        onSearchChange={setSearch}
        onToggleSeverity={toggleSeverity}
        onToggleCategory={toggleCategory}
        onSortChange={setSortOption}
      />

      {/* Active Filter Chips */}
      <FilterChips
        searchTerm={searchTerm}
        selectedSeverities={selectedSeverities as Set<string>}
        selectedCategories={selectedCategories as Set<string>}
        onRemoveSearch={removeSearch}
        onToggleSeverity={(s) => toggleSeverity(s as Parameters<typeof toggleSeverity>[0])}
        onToggleCategory={(c) => toggleCategory(c as Parameters<typeof toggleCategory>[0])}
        onResetFilters={resetFilters}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredFindings.length}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> findings
        </p>
      </div>

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only">
        Showing {filteredFindings.length} of {totalCount} findings
      </div>

      {/* Findings list or empty state */}
      {filteredFindings.length === 0 ? (
        <FindingsEmptyState onResetFilters={resetFilters} />
      ) : (
        <div className="flex flex-col gap-3" role="list">
          {filteredFindings.map((finding) => (
            <div key={finding.id} role="listitem">
              <FindingCard
                finding={finding}
                isExpanded={expandedIds.has(finding.id)}
                onToggle={() => toggleExpanded(finding.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
