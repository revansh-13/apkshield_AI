import { Severity, FindingCategory } from "@/shared/types/analysis";

// ── Severity ──────────────────────────────────────────────

export const SEVERITY_ORDER: readonly Severity[] = [
  "critical",
  "high",
  "medium",
  "low",
] as const;

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
  info: 0,
};

export const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  info: "Info",
};

// ── Categories ────────────────────────────────────────────

export const CATEGORY_LIST: readonly FindingCategory[] = [
  "Manifest",
  "Permissions",
  "Components",
  "URLs",
  "Certificates",
  "Strings",
] as const;

// ── Sort ──────────────────────────────────────────────────

export type SortOption =
  | "severity-desc"
  | "severity-asc"
  | "category"
  | "alphabetical";

export interface SortDefinition {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: readonly SortDefinition[] = [
  { value: "severity-desc", label: "Highest Severity" },
  { value: "severity-asc", label: "Lowest Severity" },
  { value: "category", label: "Category" },
  { value: "alphabetical", label: "Alphabetical" },
] as const;
