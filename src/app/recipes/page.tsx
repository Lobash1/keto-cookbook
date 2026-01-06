import RecipesClient from "./RecipesClient";

export default function RecipesPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-ketoGold mb-6">Рецепти</h1>
      <RecipesClient />
    </section>
  );
}
