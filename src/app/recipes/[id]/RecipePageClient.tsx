"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories } from "@/data/categories";
import type { Recipe } from "@/types/recipe";

type Props = {
  id: string;
};

type RecipeDoc = Recipe; // у нас тип уже описан

export default function RecipePageClient({ id }: Props) {
  const [recipe, setRecipe] = useState<RecipeDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, "recipes", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setRecipe(null);
          setError("Рецепт не знайдено");
          return;
        }

        // doc.id мы уже знаем из пропса
        const data = snap.data() as Omit<Recipe, "id">;
        setRecipe({ ...data, id });
      } catch (e) {
        console.error(e);
        setError("Помилка завантаження рецепта");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-[color:var(--foreground)]/70">Завантаження...</p>
      </section>
    );
  }

  if (error || !recipe) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-red-400">{error ?? "Рецепт не знайдено"}</p>
        <Link
          href="/recipes"
          className="inline-flex mt-4 text-sm text-ketoGold hover:underline"
        >
          ← Повернутися до списку
        </Link>
      </section>
    );
  }

  const ketoPoints = Math.round(recipe.kcal.carbs);
  const category = categories.find((c) => c.id === recipe.category);

  const imageSrc =
    recipe.photo && recipe.photo.trim() !== ""
      ? recipe.photo
      : "/placeholder.jpg";

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-[color:var(--foreground)]">
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Категорії", href: "/categories" },
          {
            label: category?.label ?? recipe.category,
            href: `/categories/${recipe.category}`,
          },
          { label: recipe.name },
        ]}
      />

      <Link
        href={`/categories/${recipe.category}`}
        className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-lg
                   border text-sm
                   hover:opacity-80 transition"
        style={{
          borderColor: "var(--foreground)",
          color: "var(--foreground)",
        }}
      >
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold text-ketoGold">{recipe.name}</h1>
      <p className="mt-2 text-[color:var(--foreground)]/70">
        {recipe.description}
      </p>

      <div className="group relative w-full mt-6 rounded-xl overflow-hidden border border-ketoRed/40 h-64 sm:h-72 md:h-96 lg:h-[420px]">
        <Image
          src={imageSrc}
          alt={recipe.name}
          fill
          className="object-cover object-[50%_60%]"
          loading="eager"
          priority
        />

        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="badge-in flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-ketoGold backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
            ⏱ {recipe.time} хв
          </div>

          <div className="badge-in badge-in-delay flex items-center gap-2 rounded-full bg-ketoGold/90 px-4 py-2 text-sm font-semibold text-ketoBlack shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_18px_rgba(240,184,72,0.35)]">
            ⭐ {ketoPoints}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-sm text-[color:var(--foreground)]/60">Ккал</p>
          <p className="text-xl font-semibold">{recipe.kcal.calories}</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-sm text-[color:var(--foreground)]/60">Білки</p>
          <p className="text-xl font-semibold">{recipe.kcal.proteins} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-sm text-[color:var(--foreground)]/60">Жири</p>
          <p className="text-xl font-semibold">{recipe.kcal.fats} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-sm text-[color:var(--foreground)]/60">Вуглеводи</p>
          <p className="text-xl font-semibold">{recipe.kcal.carbs} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-sm text-[color:var(--foreground)]/60">Кето-бали</p>
          <p className="text-xl font-semibold">{ketoPoints}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10">Інгредієнти</h2>
      <ul className="list-disc pl-6 mt-3 text-[color:var(--foreground)]/80">
        {recipe.ingredients.map((ing, index) => (
          <li key={`${recipe.id}-ing-${index}`}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-10">Спосіб приготування</h2>
      <ol className="list-decimal pl-6 mt-3 space-y-2 text-[color:var(--foreground)]/80">
        {recipe.steps.map((step, index) => (
          <li key={`${recipe.id}-step-${index}`}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
