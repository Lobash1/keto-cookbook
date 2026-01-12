import Breadcrumbs from "@/components/Breadcrumbs";
import CategoriesGrid from "@/components/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <section
      className="max-w-6xl mx-auto px-4 py-10"
      style={{ color: "var(--foreground)" }}
    >
      <Breadcrumbs
        items={[
          { label: "Головна", href: "/" },
          { label: "Категорії", href: "/categories" },
        ]}
      />

      <h2 className="text-3xl font-bold text-ketoGold text-center mb-8">
        Категорії рецептів:
      </h2>

      <CategoriesGrid />
    </section>
  );
}
