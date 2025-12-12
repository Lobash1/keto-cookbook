/* eslint-disable @next/next/no-img-element */

import CategotyCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function Home() {
  return (
    <>
      <section className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-10">
        <img
          src="/hero-meat.jpg"
          alt="keto background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <h1 className="absolute inset-0 flex items-center justify-center text-center text-4xl md:text-5xl lg:text-6xl font-bold text-ketoGold">
          Преміум Кето Рецепти
        </h1>
      </section>

      <h2 className="text-3xl font-bold text-ketoGold mb-6 text-center">
        Категорії рецептів
      </h2>
      <div className="grid grid-cols-2 md:grid-cols3 lg:grid-cols-6 gap-4 p-6">
        {categories.map((cat) => (
          <CategotyCard key={cat.id} id={cat.id} label={cat.label} />
        ))}
      </div>
    </>
  );
}
