/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@/types/recipe";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const imageSrc =
    recipe.photo && recipe.photo.trim() !== ""
      ? recipe.photo
      : "/placeholder.jpg";
  return (
    <article
      className="
        group 
        rounded-xl overflow-hidden 
        border border-ketoRed/40 
        transition-shadow
        bg-[var(--card-bg)]
        hover:shadow-[0_0_30px_rgba(220,38,38,0.35)]
      "
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={recipe.name}
          className="
            h-full w-full object-cover 
            transition-transform duration-500 group-hover:scale-110
          "
        />
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {recipe.name}
        </h3>

        <p className="mt-2 text-sm flex items-center gap-2 text-ketoGold">
          ⏱ {recipe.time} хв
        </p>
      </div>
    </article>
  );
}
