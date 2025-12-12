import { categories } from "@/data/categories";
import { recipes } from "../../../data/recipes";
import RecipeCard from "@/components/RecipeCard";

export default function CategotyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const filtered = recipes.filter((r) => r.category === id);
  const category = categories.find((c) => c.id === id);

  if (!category)
    return <div className="text-white p-6">Категорія не знайденa</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <h3 className="text-2xl font-bold mb-4">Категорія: {category.label}</h3>
      {filtered.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
