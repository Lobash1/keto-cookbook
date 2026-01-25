"use client";

import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { recipesSeed } from "@/seed/recipesSeed";

export default function DevSeedPage() {
  const seed = async () => {
    if (!confirm("Залити seed-рецепти в базу? (один раз)")) return;

    // ✅ защита от повторного залива
    const metaRef = doc(db, "meta", "seed_v1");
    const metaSnap = await getDoc(metaRef);

    if (metaSnap.exists()) {
      alert("Seed уже був виконаний ✅");
      return;
    }

    for (const r of recipesSeed) {
      await addDoc(collection(db, "recipes"), {
        ...r,
        authorId: auth.currentUser?.uid ?? null,
        authorName: auth.currentUser?.displayName ?? "Seed",
        createdAt: serverTimestamp(),
      });
    }

    await setDoc(metaRef, {
      seededAt: serverTimestamp(),
      count: recipesSeed.length,
    });

    alert(`Готово! Додано рецептів: ${recipesSeed.length} ✅`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-[color:var(--foreground)]">
      <h1 className="text-2xl font-bold mb-4">Dev Seed</h1>
      <p className="mb-6 text-[color:var(--foreground)]/70">
        Натисни кнопку, щоб один раз залити стартові рецепти у Firestore.
      </p>

      <button
        onClick={seed}
        className="px-4 py-2 rounded-xl bg-ketoGold text-ketoBlack font-semibold hover:opacity-90"
      >
        Seed recipes
      </button>

      <p className="mt-4 text-sm text-[color:var(--foreground)]/60">
        Після заповнення бази цю сторінку можна видалити.
      </p>
    </div>
  );
}
