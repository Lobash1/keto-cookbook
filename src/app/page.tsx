import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";

export default function Home() {
  return (
    <main className="min-h-screen bg-ketoBlack text-ketoWhite p-6">
      <h1
        className="text-5xl text-center
 font-bold text-ketoGold drop-shadow-[0_0_10px_rgba(255,209,102,0.6)]
 mb-8"
      >
        «Преміальні Кето Рецепти»
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.name} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
