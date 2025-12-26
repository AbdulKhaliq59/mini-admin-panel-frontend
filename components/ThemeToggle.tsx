"use client";
import React from "react";
import { useTheme } from "../app/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded px-2 py-1 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
