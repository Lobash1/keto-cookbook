"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Image from "next/image";

export default function AuthButton() {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      const err = error as FirebaseError;

      if (err.code === "auth/popup-closed-by-user") {
        console.log("Вікно авторизації закрито користувачем");
        return;
      }

      console.error("Auth error:", err);
      alert("Не вдалося увійти. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={login}
      disabled={loading}
      className="
        inline-flex items-center gap-2
        rounded-xl px-4 py-2 text-sm font-semibold
        transition disabled:opacity-50 disabled:cursor-not-allowed

        bg-ketoGold text-ketoBlack
        hover:bg-ketoGold/90
      "
    >
      {loading ? (
        <>
          <span className="h-4 w-4 border-2 border-ketoBlack border-t-transparent rounded-full animate-spin" />
          Завантаження...
        </>
      ) : (
        <>
          Увійти:
          <Image
            src="/google-icon.png"
            alt="Google icon"
            width={20}
            height={20}
            className="pointer-events-none"
            priority
          />
        </>
      )}
    </button>
  );
}
