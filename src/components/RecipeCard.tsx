/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@/types/recipe";
import { useState } from "react";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const initialSrc =
    recipe.photo && recipe.photo.trim() !== ""
      ? recipe.photo.trim()
      : "/placeholder.jpg";

  const [src, setSrc] = useState(initialSrc);

  return (
    <article
      className="
        group relative
        rounded-2xl overflow-hidden
        border border-ketoRed/40
        bg-[var(--card-bg)]
        transition
        hover:border-ketoGold/40
        hover:shadow-[0_0_30px_rgba(220,38,38,0.25)]
      "
    >
      {/* media */}
      <div className="relative h-56 w-full">
        <img
          src={src}
          alt={recipe.name}
          loading="lazy"
          onError={() => setSrc("/placeholder.jpg")}
          className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* градиент чтобы текст читался */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* рамка-оверлей, чтобы текст не “влазил” под border */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ketoRed/30 group-hover:ring-ketoGold/30" />

        {/* текст поверх картинки */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-semibold leading-snug text-ketoWhite drop-shadow">
            {recipe.name}
          </h3>

          <p className="mt-2 text-sm flex items-center gap-2 text-ketoGold">
            ⏱ {recipe.time} хв
          </p>
        </div>
      </div>
    </article>
  );
}
