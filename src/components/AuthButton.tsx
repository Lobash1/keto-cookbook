"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

export default function AuthButton() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Вхід успішний!");
    } catch (error) {
      const err = error as FirebaseError;

      if (err.code === "auth/popup-closed-by-user") {
        console.log("Користувач закрив вікно авторизації.");
        return;
      }

      console.error("Помилка при вході:", err);
      alert("Не вдалося увійти. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={login}
      disabled={loading}
      className="rounded-xl bg-ketoGold text-ketoBlack font-semibold px-4 py-1.5 text-sm
                 hover:bg-ketoGold/90 transition
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Завантаження..." : "Увійти з Google"}
    </button>
  );
}
