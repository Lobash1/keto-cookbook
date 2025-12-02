/* eslint-disable @next/next/no-img-element */
import { recipes } from "../../../data/recipes";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = recipes.find((recipe) => recipe.id === id);
  if (!recipe) return <div className="text-white p-6">Рецепт не знайдено</div>;

  return (
    <div className="relative h-72 md:h-96 lg:h-[480px] xl:h-[600px] w-full text-white p-6">
      <img
        src={recipe.photo}
        alt={recipe.name}
        className="w-full h-full object-cover rounded-b-xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-ketoGold">
        {recipe.name}
      </h1>
    </div>
  );
}
