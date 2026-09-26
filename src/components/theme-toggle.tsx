"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { trackAnalyticsEvent } from "./analytics-events";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button
        aria-label="Seleziona tema"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-xl"
        type="button"
      >
        <span aria-hidden="true">🌗</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-xl transition-transform duration-300 hover:scale-105"
      onClick={() => {
        const theme = isDark ? "light" : "dark";
        setTheme(theme);
        trackAnalyticsEvent("theme_change", { theme });
      }}
      title={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      type="button"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
