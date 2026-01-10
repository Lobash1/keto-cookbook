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

  if (loading) return null; // пока не знаем, кто юзер — ничего не рисуем

  // Получим букву для “аватарки”
  const letter =
    user?.displayName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error:", e);
    }
  };

  return (
    <div
      className="
        fixed left-6 top-6 z-40
        flex items-center gap-3
        rounded-2xl border border-ketoGold/30
        bg-black/50 backdrop-blur
        px-4 py-2
        text-xs sm:text-sm
      "
    >
      {user ? (
        <>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-ketoGold text-ketoBlack 
                         flex items-center justify-center text-sm font-bold"
            >
              {letter}
            </div>
            <div className="flex flex-col">
              <span className="text-ketoWhite/80 max-w-[160px] truncate">
                {user.email}
              </span>
              <span className="text-[10px] text-ketoGold/80">
                Авторизовано через Google
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 text-[11px] rounded-full border border-ketoGold/60 
                       px-2 py-1 text-ketoGold hover:bg-ketoGold hover:text-ketoBlack transition"
          >
            Вийти
          </button>
        </>
      ) : (
        <>
          <span className="hidden sm:inline text-ketoWhite/70">
            Ви як гість
          </span>
          <AuthButton />
        </>
      )}
    </div>
  );
}
