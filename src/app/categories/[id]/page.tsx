import { categories } from "@/data/categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import RecipesClient from "@/app/recipes/RecipesClient";

export default async function CategotyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: categoryId } = await params;

  const category = categories.find((c) => c.id === categoryId);

  if (!category)
    return (
      <div className="p-6" style={{ color: "var(--foreground)" }}>
        Такої категорії не існує: {categoryId}
      </div>
    );

  return (
    <section
      className="max-w-6xl mx-auto px-4 py-10"
      style={{ color: "var(--foreground)" }}
    >
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Категорії", href: "/categories" },
          { label: category.label },
        ]}
      />

      <h3 className="text-2xl text-ketoGold text-center font-bold mb-6">
        Категорія: {category.label}
      </h3>

      <RecipesClient category={categoryId} />
    </section>
  );
}
