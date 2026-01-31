"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthButton from "@/components/AuthButton";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return null;

  const letter =
    user?.displayName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  if (!user) {
    // гость
    return (
      <div className="flex items-center gap-3 text-xs sm:text-sm">
        <span className="hidden sm:inline opacity-70">Ви як гість</span>
        <AuthButton />
      </div>
    );
  }

  // залогинен
  return (
    <div className="flex items-center gap-3 text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-ketoGold text-ketoBlack flex items-center justify-center font-bold text-sm">
          {letter}
        </div>
        <div className="flex flex-col">
          <span className="max-w-[160px] truncate text-[13px]">
            {user.email}
          </span>
          <span className="text-[10px] text-ketoGold/80">
            Авторизовано через Google
          </span>
        </div>
      </div>
      <button
        onClick={() => signOut(auth)}
        className="text-[11px] rounded-full border border-ketoGold/60 px-3 py-1 text-ketoGold hover:bg-ketoGold hover:text-ketoBlack transition"
      >
        Вийти
      </button>
    </div>
  );
}
