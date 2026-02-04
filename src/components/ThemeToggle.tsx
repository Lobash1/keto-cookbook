"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition hover:opacity-80"
      style={{
        borderColor: "var(--card-border)",
        background: "var(--card-bg)",
        color: "var(--foreground)",
      }}
      aria-label="Переключити тему"
    >
      <span>{isDark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
