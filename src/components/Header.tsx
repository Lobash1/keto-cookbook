// src/components/Header.tsx
"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthStatus from "@/components/AuthStatus";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        background: "color-mix(in srgb, var(--background) 86%, transparent)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Лого / название */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-ketoGold">Keto Cookbook</span>
          <span className="text-[11px] uppercase tracking-[0.16em] opacity-70 hidden sm:inline">
            Premium low-carb recipes
          </span>
        </Link>

        {/* Правый блок: статус + переключатель темы */}
        <div className="flex items-center gap-3">
          <AuthStatus />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
