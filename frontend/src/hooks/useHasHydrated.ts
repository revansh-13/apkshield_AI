"use client";

import { useSyncExternalStore } from "react";

// useSyncExternalStore is the React 18 canonical way to detect client hydration.
// - serverSnapshot returns false (server has not hydrated)
// - clientSnapshot returns true (client is always hydrated)
// This avoids the react-hooks/set-state-in-effect lint error that occurs when
// calling setState() synchronously inside a useEffect body.
const emptySubscribe = () => () => {};

export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,   // client snapshot — always true after mount
    () => false,  // server snapshot — false during SSR/initial hydration
  );
}
