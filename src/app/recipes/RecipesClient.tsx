"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/types/recipe";

type RecipeDoc = Omit<Recipe, "id"> & {
  id: string;
  createdAt?: unknown; // якщо потім додаси
};

type Props = {
  category?: string; // <- опційна категорія
};

export default function RecipesClient({ category }: Props) {
  const [recipes, setRecipes] = useState<RecipeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // базовый запрос
        let q = query(collection(db, "recipes"));

        // если в пропсах передали category — добавляем фильтр
        if (category) {
          q = query(
            collection(db, "recipes"),
            where("category", "==", category)
          );
        }

        const snap = await getDocs(q);

        const list = snap.docs.map((d) => ({
          ...(d.data() as Omit<Recipe, "id">),
          id: d.id,
        }));

        setRecipes(list);
      } catch (err) {
        setError("Помилка завантаження рецептів");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category]); // важно: зависимость от category

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
