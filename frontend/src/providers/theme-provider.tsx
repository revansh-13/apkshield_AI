"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider wraps the application with next-themes to enable
 * system-aware dark/light mode switching. Dark mode is the default.
 *
 * This is a Client Component because it depends on browser APIs
 * to read the user's system color scheme preference.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
