"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthStatus from "@/components/AuthStatus";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // ждём, пока компонент смонтируется
  useEffect(() => {
    setMounted(true);
  }, []);

  // слушаем авторизацию
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  if (!mounted) return null;

  const isLoggedIn = !!user;

  return (
    <header
      className="
        sticky top-0 z-30
        border-b
        px-6 py-3
        flex items-center justify-between gap-4
        backdrop-blur-md
      "
      style={{
        background: "var(--header-bg)",
        borderColor: "var(--header-border)",
        color: "var(--foreground)",
      }}
    >
      {/* ЛОГО */}
      <Link href="/" className="font-semibold text-sm sm:text-base">
        Keto Cookbook
      </Link>

      <div className="flex items-center gap-3">
        {/* КНОПКА ДОБАВИТЬ РЕЦЕПТ */}
        {isLoggedIn ? (
          <Link
            href="/add-recipe"
            className="
              rounded-lg px-3 py-1.5 text-sm font-semibold
              border transition
              hover:opacity-80
            "
            style={{
              borderColor: "var(--foreground)",
              color: "var(--foreground)",
            }}
          >
            ➕ Додати рецепт
          </Link>
        ) : (
          <div
            className="
              rounded-lg px-3 py-1.5 text-sm font-semibold border opacity-40
              cursor-not-allowed select-none
              relative
            "
            style={{
              borderColor: "var(--foreground)",
              color: "var(--foreground)",
            }}
            title="Увійдіть, щоб додати рецепт"
          >
            ➕ Додати рецепт
          </div>
        )}

        {/* Статус и переключение темы */}
        <AuthStatus />
        <ThemeToggle />
      </div>
    </header>
  );
}
