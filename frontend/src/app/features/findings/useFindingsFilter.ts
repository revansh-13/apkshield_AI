import { useReducer, useMemo, useCallback } from "react";
import { Finding, Severity, FindingCategory } from "@/shared/types/analysis";
import { useDebounce } from "@/hooks/useDebounce";
import { SEVERITY_WEIGHT, type SortOption } from "./constants";

// ── State Shape ───────────────────────────────────────────

interface FindingsFilterState {
  searchTerm: string;
  selectedSeverities: Set<Severity>;
  selectedCategories: Set<FindingCategory>;
  sortOption: SortOption;
  expandedIds: Set<string>;
}

// ── Actions ───────────────────────────────────────────────

type FindingsFilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "TOGGLE_SEVERITY"; payload: Severity }
  | { type: "TOGGLE_CATEGORY"; payload: FindingCategory }
  | { type: "SET_SORT"; payload: SortOption }
  | { type: "TOGGLE_EXPANDED"; payload: string }
  | { type: "REMOVE_SEARCH" }
  | { type: "RESET_FILTERS" };

// ── Initial State ─────────────────────────────────────────

const initialState: FindingsFilterState = {
  searchTerm: "",
  selectedSeverities: new Set<Severity>(),
  selectedCategories: new Set<FindingCategory>(),
  sortOption: "severity-desc",
  expandedIds: new Set<string>(),
};

// ── Reducer ───────────────────────────────────────────────

function findingsReducer(
  state: FindingsFilterState,
  action: FindingsFilterAction
): FindingsFilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };

    case "REMOVE_SEARCH":
      return { ...state, searchTerm: "" };

    case "TOGGLE_SEVERITY": {
      const next = new Set(state.selectedSeverities);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, selectedSeverities: next };
    }

    case "TOGGLE_CATEGORY": {
      const next = new Set(state.selectedCategories);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, selectedCategories: next };
    }

    case "SET_SORT":
      return { ...state, sortOption: action.payload };

    case "TOGGLE_EXPANDED": {
      const next = new Set(state.expandedIds);
      if (next.has(action.payload)) {
        next.delete(action.payload);
      } else {
        next.add(action.payload);
      }
      return { ...state, expandedIds: next };
    }

    case "RESET_FILTERS":
      return { ...initialState };

    default:
      return state;
  }
}

// ── Search helper ─────────────────────────────────────────

function matchesSearch(finding: Finding, term: string): boolean {
  const lowerTerm = term.toLowerCase();
  return (
    finding.title.toLowerCase().includes(lowerTerm) ||
    finding.description.toLowerCase().includes(lowerTerm) ||
    finding.recommendation.toLowerCase().includes(lowerTerm) ||
    finding.rule_id.toLowerCase().includes(lowerTerm) ||
    finding.category.toLowerCase().includes(lowerTerm)
  );
}

// ── Sort comparators ──────────────────────────────────────

function sortFindings(findings: Finding[], option: SortOption): Finding[] {
  const sorted = [...findings];

  switch (option) {
    case "severity-desc":
      return sorted.sort((a, b) => SEVERITY_WEIGHT[b.severity] - SEVERITY_WEIGHT[a.severity]);
    case "severity-asc":
      return sorted.sort((a, b) => SEVERITY_WEIGHT[a.severity] - SEVERITY_WEIGHT[b.severity]);
    case "category":
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    case "alphabetical":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

// ── Hook ──────────────────────────────────────────────────

export function useFindingsFilter(findings: Finding[]) {
  const [state, dispatch] = useReducer(findingsReducer, initialState);
  const debouncedSearch = useDebounce(state.searchTerm, 300);

  // Filter pipeline
  const filteredFindings = useMemo(() => {
    let result = findings;

    // 1. Search
    if (debouncedSearch.trim()) {
      result = result.filter((f) => matchesSearch(f, debouncedSearch));
    }

    // 2. Severity filter
    if (state.selectedSeverities.size > 0) {
      result = result.filter((f) => state.selectedSeverities.has(f.severity));
    }

    // 3. Category filter
    if (state.selectedCategories.size > 0) {
      result = result.filter((f) => state.selectedCategories.has(f.category));
    }

    // 4. Sort
    result = sortFindings(result, state.sortOption);

    return result;
  }, [findings, debouncedSearch, state.selectedSeverities, state.selectedCategories, state.sortOption]);

  // Stable action callbacks
  const setSearch = useCallback((term: string) => {
    dispatch({ type: "SET_SEARCH", payload: term });
  }, []);

  const removeSearch = useCallback(() => {
    dispatch({ type: "REMOVE_SEARCH" });
  }, []);

  const toggleSeverity = useCallback((severity: Severity) => {
    dispatch({ type: "TOGGLE_SEVERITY", payload: severity });
  }, []);

  const toggleCategory = useCallback((category: FindingCategory) => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: category });
  }, []);

  const setSortOption = useCallback((option: SortOption) => {
    dispatch({ type: "SET_SORT", payload: option });
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_EXPANDED", payload: id });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const hasActiveFilters =
    state.searchTerm.trim().length > 0 ||
    state.selectedSeverities.size > 0 ||
    state.selectedCategories.size > 0;

  return {
    // State
    searchTerm: state.searchTerm,
    selectedSeverities: state.selectedSeverities,
    selectedCategories: state.selectedCategories,
    sortOption: state.sortOption,
    expandedIds: state.expandedIds,

    // Derived
    filteredFindings,
    totalCount: findings.length,
    hasActiveFilters,

    // Actions
    setSearch,
    removeSearch,
    toggleSeverity,
    toggleCategory,
    setSortOption,
    toggleExpanded,
    resetFilters,
  };
}
