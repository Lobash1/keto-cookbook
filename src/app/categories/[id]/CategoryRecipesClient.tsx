"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe } from "@/types/recipe";

type RecipeDoc = Recipe & {
  createdAt?: unknown;
};

type Props = {
  categoryId: string;
};

export default function CategoryRecipesClient({ categoryId }: Props) {
  const [recipes, setRecipes] = useState<RecipeDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const q = query(
          collection(db, "recipes"),
          where("category", "==", categoryId)
        );

        const snap = await getDocs(q);

        const items = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Recipe, "id">),
        })) as RecipeDoc[];

        setRecipes(items);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [categoryId]);

  if (loading) {
    return (
      <p className="text-center mt-6 text-[color:var(--foreground)]/70">
        Завантаження рецептів...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-6 text-red-500">
        Помилка завантаження: {error}
      </p>
    );
  }

  if (recipes.length === 0) {
    return (
      <p className="text-center mt-6 text-[color:var(--foreground)]/80">
        У цій категорії поки що немає рецептів
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
