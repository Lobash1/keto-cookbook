"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";

import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/types/recipe";
import { db } from "@/lib/firebase";

type RecipeDoc = Omit<Recipe, "id"> & {
  id: string;
};

type Props = {
  category?: string;
};

export default function RecipesClient({ category }: Props) {
  const [recipes, setRecipes] = useState<RecipeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        let q = query(collection(db, "recipes"));

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
        console.error(err);
        setError("Помилка завантаження рецептів");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category]);

  if (loading) {
    return (
      <p className="mb-6 text-[color:var(--foreground)]/70">Завантаження...</p>
    );
  }

  if (error) {
    return <p className="mb-6 text-sm text-red-500">Помилка: {error}</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((r) => (
        <li key={r.id}>
          <Link href={`/recipes/${r.id}`} className="block">
            <RecipeCard recipe={r} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
