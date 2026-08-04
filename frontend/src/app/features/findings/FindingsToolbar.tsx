"use client";

import * as React from "react";
import { Severity, FindingCategory } from "@/shared/types/analysis";
import { SEVERITY_ORDER, SEVERITY_LABELS, CATEGORY_LIST, SORT_OPTIONS, type SortOption } from "./constants";
import { cn } from "@/lib/utils";
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";

// ── Props ─────────────────────────────────────────────────

interface FindingsToolbarProps {
  searchTerm: string;
  selectedSeverities: Set<Severity>;
  selectedCategories: Set<FindingCategory>;
  sortOption: SortOption;
  onSearchChange: (term: string) => void;
  onToggleSeverity: (severity: Severity) => void;
  onToggleCategory: (category: FindingCategory) => void;
  onSortChange: (option: SortOption) => void;
}

// ── Dropdown component ────────────────────────────────────

function FilterDropdown<T extends string>({
  label,
  icon: Icon,
  options,
  selected,
  getLabel,
  onToggle,
}: {
  label: string;
  icon: React.ElementType;
  options: readonly T[];
  selected: Set<T>;
  getLabel: (option: T) => string;
  onToggle: (option: T) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          selected.size > 0
            ? "border-primary/50 bg-primary/5 text-primary"
            : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
        {selected.size > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {selected.size}
          </span>
        )}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-label={`Filter by ${label}`}
          className="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg border border-border bg-card p-1 shadow-lg"
        >
          {options.map((option) => {
            const active = selected.has(option);
            return (
              <button
                key={option}
                role="option"
                aria-selected={active}
                onClick={() => onToggle(option)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <div className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  active ? "border-primary bg-primary" : "border-muted-foreground/40"
                )}>
                  {active && (
                    <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {getLabel(option)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────

function SortDropdown({
  sortOption,
  onSortChange,
}: {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = SORT_OPTIONS.find((s) => s.value === sortOption)?.label ?? "Sort";

  return (
    <div ref={ref} className="relative" onKeyDown={(e) => { if (e.key === "Escape") setIsOpen(false); }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium",
          "text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">{currentLabel}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Sort findings"
          className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-border bg-card p-1 shadow-lg"
        >
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={sortOption === opt.value}
              onClick={() => { onSortChange(opt.value); setIsOpen(false); }}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                sortOption === opt.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-accent"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Toolbar ──────────────────────────────────────────

export function FindingsToolbar({
  searchTerm,
  selectedSeverities,
  selectedCategories,
  sortOption,
  onSearchChange,
  onToggleSeverity,
  onToggleCategory,
  onSortChange,
}: FindingsToolbarProps) {
  return (
    <div
      role="search"
      aria-label="Filter findings"
      className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-4 -mx-1 px-1"
    >
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search findings by title, description, rule ID..."
          aria-label="Search findings"
          className={cn(
            "w-full rounded-xl border border-border bg-card pl-10 pr-10 py-3 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary",
            "transition-colors"
          )}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filter + Sort row */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <FilterDropdown
          label="Severity"
          icon={SlidersHorizontal}
          options={SEVERITY_ORDER}
          selected={selectedSeverities}
          getLabel={(s) => SEVERITY_LABELS[s]}
          onToggle={onToggleSeverity}
        />
        <FilterDropdown
          label="Category"
          icon={SlidersHorizontal}
          options={CATEGORY_LIST}
          selected={selectedCategories}
          getLabel={(c) => c}
          onToggle={onToggleCategory}
        />
        <div className="ml-auto">
          <SortDropdown sortOption={sortOption} onSortChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
