import { recipes } from "@/data/recipes";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories } from "@/data/categories";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <div className="text-white p-6">Рецепт не знайдено</div>;

  const ketoPoints = Math.round(recipe.kcal.carbs);
  const category = categories.find((c) => c.id === recipe.category);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white">
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
        className="inline-flex items-center gap-2 text-ketoGold border border-ketoGold mb-7 px-4 py-2 rounded-lg hover:bg-ketoGold hover:text-ketoBlack transition"
      >
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold text-ketoGold">{recipe.name}</h1>
      <p className="text-white/70 mt-2">{recipe.description}</p>

      <div className="group relative w-full mt-6 rounded-xl overflow-hidden border border-ketoRed/40 h-64 sm:h-72 md:h-96 lg:h-[420px]">
        <Image
          src={recipe.photo}
          alt={recipe.name}
          fill
          className="object-cover object-[50%_60%]"
        />

        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <div className="badge-in flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-ketoGold backdrop-blur-md transition-transform duration-300 group-hover:-translate-y-0.5">
            ⏱ {recipe.time} хв
          </div>

          <div
            className="badge-in badge-in-delay flex items-center gap-2 rounded-full bg-ketoGold/90 px-4 py-2 text-sm font-semibold text-ketoBlack shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_18px_rgba(240,184,72,0.35)]
"
          >
            ⭐ {ketoPoints}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-white/60 text-sm">Ккал</p>
          <p className="text-xl font-semibold">{recipe.kcal.calories}</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-white/60 text-sm">Білки</p>
          <p className="text-xl font-semibold">{recipe.kcal.proteins} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-white/60 text-sm">Жири</p>
          <p className="text-xl font-semibold">{recipe.kcal.fats} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-white/60 text-sm">Вуглеводи</p>
          <p className="text-xl font-semibold">{recipe.kcal.carbs} г</p>
        </div>
        <div className="rounded-xl border border-ketoRed/30 p-4">
          <p className="text-white/60 text-sm">Кето-бали</p>
          <p className="text-xl font-semibold">{ketoPoints}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10">Інгредієнти</h2>
      <ul className="list-disc pl-6 mt-3 text-white/80">
        {recipe.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-10">Спосіб приготування</h2>
      <ol className="list-decimal pl-6 mt-3 text-white/80 space-y-2">
        {recipe.steps.map((step, index) => (
          <li key={`${recipe.id}-step-${index}`}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
