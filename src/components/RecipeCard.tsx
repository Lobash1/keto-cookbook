/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@/types/recipe";
import Link from "next/link";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="bg-ketoBlack rounded-xl border border-ketoRed shadow-lg cursor-pointer transition hover:shadow-ketoRed/50">
        <img
          className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
          src={recipe.photo}
          alt={recipe.name}
        />

        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-ketoWhite">
            {recipe.name}
          </h2>
          <p className="text-sm text-ketoGold"> ⏱ {recipe.time} мін</p>
        </div>
      </div>
    </Link>
  );
}
