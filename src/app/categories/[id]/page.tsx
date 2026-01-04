import { categories } from "@/data/categories";
import { recipes } from "../../../data/recipes";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";

export default async function CategotyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = await params;

  const filtered = recipes.filter((r) => r.category === categoryId);
  const category = categories.find((c) => c.id === categoryId);

  if (!category)
    return (
      <div className="text-white p-6">
        Такої категорії не існує: {categoryId}
      </div>
    );

  return (
    <section>
      <h3 className="text-2xl text-ketoGold text-center font-bold mb-6">
        Категорія: {category.label}
      </h3>

      <p className="text-white/70 text-center">Found: {filtered.length}</p>

      {filtered.length === 0 ? (
        <p className="text-white text-center mt-6">
          У цій категорії поки що немає рецептів
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filtered.map((r) => (
            <li key={r.id} className="text-white">
              <Link href={`/recipes/${r.id}`} className="block">
                <RecipeCard recipe={r} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
