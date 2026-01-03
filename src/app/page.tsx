/* eslint-disable @next/next/no-img-element */

import CategotyCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src="/hero-meat.jpg"
        alt="keto background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-center mb-16 text-4xl  md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto text-ketoGold">
          Преміум Кето Рецепти
        </h1>

        <h2 className="text-3xl font-bold text-ketoGold mb-12 text-center">
          Категорії рецептів
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6 mx-auto">
          {categories.map((cat) => (
            <CategotyCard
              key={cat.id}
              id={cat.id}
              label={cat.label}
              image={cat.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
