/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@/types/recipe";
import Link from "next/link";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <article className="group bg-ketoBlack rounded-xl border border-ketoRed/40 overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(220,38,38,0.35)]">
      {/* IMAGE WRAPPER */}
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.photo}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{recipe.name}</h3>

        <p className="mt-2 text-sm text-ketoGold flex items-center gap-2">
          ⏱ {recipe.time} хв
        </p>
      </div>
    </article>
  );
}
