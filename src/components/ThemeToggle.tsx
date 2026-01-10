"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Чтобы не было бага с SSR: ждём, пока компонент смонтируется на клиенте
  useEffect(() => {
    // Нам нужно 1 раз отметить, что компонент смонтирован,
    // чтобы избежать проблем с SSR и next-themes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        fixed right-6 top-6 z-50
        flex items-center gap-2
        rounded-full border border-ketoGold/40
        bg-black/40 backdrop-blur
        px-4 py-2 text-sm font-medium
        text-ketoGold
        hover:bg-ketoGold hover:text-ketoBlack
        transition
      "
      aria-label="Переключити тему"
    >
      {isDark ? "☀️ Світла" : "🌙 Темна"}
    </button>
  );
}
