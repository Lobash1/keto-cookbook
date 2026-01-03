import { recipes } from "@/data/recipes";
import Link from "next/link";
import Image from "next/image";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <div className="text-white p-6">Рецепт не знайдено</div>;

  const ketoPoints = Math.round(recipe.kcal.carbs);

  return (
    <section className="max-w-4xl mx-auto p-6 text-white">
      <Link
        href={`/categories/${recipe.category}`}
        className="inline-flex items-center gap-2 text-ketoGold border border-ketoGold px-4 py-2 rounded-lg hover:bg-ketoGold hover:text-ketoBlack transition"
      >
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold text-ketoGold">{recipe.name}</h1>
      <p className="text-white/70 mt-2">{recipe.description}</p>

      <div className="relative w-full h-72 mt-6 rounded-xl overflow-hidden border border-ketoRed/40">
        <Image
          src={recipe.photo}
          alt={recipe.name}
          fill
          className="object-cover"
        />
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

      <h2 className="text-2xl font-bold mt-10">Кроки</h2>
      <ol className="list-decimal pl-6 mt-3 text-white/80 space-y-2">
        {recipe.steps.map((step, index) => (
          <li key={`${recipe.id}-step-${index}`}>{step}</li>
        ))}
      </ol>

      {/* 
        <div className="p-6 text-ketoWhite max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-ketoGold mb-2">
            Інгредієнти
          </h2>

          <ul className="list-disc pl-6 mb-6 space-y-1">
            {recipe.ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-ketoGold mb-2">
            КБЖУ на порцію
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-black/40 p-4 rounded-xl border border-ketoRed/40">
            <div>
              <p className="text-sm text-ketoWhite/70">Калорії</p>
              <p className="text-xl font-bold">{recipe.kcal.calories}</p>
            </div>
            <div>
              <p className="text-sm text-ketoWhite/70">Білки</p>
              <p className="text-xl font-bold">{recipe.kcal.proteins}</p>
            </div>
            <div>
              <p className="text-sm text-ketoWhite/70">Жири</p>
              <p className="text-xl font-bold">{recipe.kcal.fats}</p>
            </div>
            <div>
              <p className="text-sm text-ketoWhite/70">Вуглеводи</p>
              <p className="text-xl font-bold">{recipe.kcal.carbs}</p>
            </div>
            <div>
              <p className="text-sm text-ketoWhite/70">Кето-бали</p>
              <p className="text-xl font-bold text-ketoGold">{ketoPoints}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-ketoGold p-4 mb-2">
            Спосіб приготування
          </h2>

          <ol className="list-decimal pl-6 space-y-2 text-ketoWhite/90">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div> */}
    </section>
  );
}
