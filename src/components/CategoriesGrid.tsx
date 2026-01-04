import { categories } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesGrid() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((c) => (
        <li key={c.id}>
          <CategoryCard id={c.id} label={c.label} image={c.image} />
        </li>
      ))}
    </ul>
  );
}
