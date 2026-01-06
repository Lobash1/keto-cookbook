"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/recipe";

type RecipeDoc = Recipe & {
  createdAt?: unknown; // если добавишь потом
};

export default function RecipesClient() {
  const [recipes, setRecipes] = useState<RecipeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // если поля createdAt нет — временно убери orderBy
        const q = query(
          collection(db, "recipes"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Recipe, "id">),
        }));

        setRecipes(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p className="text-white/70">Завантаження...</p>;
  if (error) return <p className="text-red-400">Помилка: {error}</p>;

  return (
    <>
      <p className="text-white/70 mb-6">Found: {recipes.length}</p>

      {recipes.length === 0 ? (
        <p className="text-white/70">Поки що немає рецептів у базі.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <li key={r.id}>
              {/* ВАЖНО: RecipeCard уже содержит Link? Тогда тут НЕ оборачивать */}
              <Link href={`/recipes/${r.id}`} className="block">
                <RecipeCard recipe={r} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
