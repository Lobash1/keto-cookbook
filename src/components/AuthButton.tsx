"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthButton() {
  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <button
      onClick={login}
      className="rounded-xl bg-ketoGold text-ketoBlack font-semibold px-5 py-2 hover:bg-ketoGold/90 transition"
    >
      Увійти з Google
    </button>
  );
}
