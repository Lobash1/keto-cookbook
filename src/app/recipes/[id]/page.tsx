/* eslint-disable @next/next/no-img-element */
import { recipes } from "../../../data/recipes";
import Link from "next/link";

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
    <div className="text-white p-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-ketoGold border border-ketoGold px-4 py-2 rounded-lg hover:bg-ketoGold hover:text-ketoBlack transition"
      >
        ← Назад
      </Link>

      {/* <div className="relative h-72 md:h-96 lg:h-[480px] xl:h-[600px] w-full text-white p-6"> */}
      <div>
        <img
          src={recipe.photo}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-b-xl"
        />

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div> */}

        <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-ketoGold">
          {recipe.name}
        </h1>
      </div>

      <div className="p-6 text-ketoWhite max-w-3xl mx-auto">
        <p className="text-lg text-ketoWhite/80 mb-4">{recipe.description}</p>

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

        {/* <h2 className="text-2xl font-semibold text-ketoGold mt-8 mb-2">
          Кето-бали
        </h2> */}

        {/* <div className="bg-black/40 p-4 rounded-xl border border-ketoRed/40 inline-block">
          <p className="text-sm text-ketoWhite/70">Оцінка страви</p>
          <p className="text-3xl font-bold text-ketoGold">
            {recipe.ketoScore} балів
          </p>
        </div> */}
      </div>
    </div>
  );
}
