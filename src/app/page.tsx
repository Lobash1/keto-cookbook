import CategoriesGrid from "@/components/CategoriesGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-meat.jpg"
          alt="keto background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90" />
        <div className="absolute inset-0 bg-black/30 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto rounded-3xl border border-ketoGold/30 bg-black/5 backdrop-blur-lg p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
            <p className="text-center text-ketoGold/80 tracking-widest uppercase text-sm mb-4">
              Keto • Low-Carb • Personal Cookbook
            </p>

            <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-ketoGold">
              Преміум Кето Рецепти
            </h1>

            <p className="text-center text-white/70 mt-7 text-base md:text-lg">
              Зберігай улюблені рецепти та додавай нові — твій особистий
              кето-щоденник.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a
                href="#categories"
                className="inline-flex justify-center items-center rounded-xl px-6 py-3 bg-ketoGold text-ketoBlack font-semibold hover:bg-ketoGold/90 transition"
              >
                Дивитись категорії
              </a>

              <Link
                href="#newrecipe"
                className="inline-flex justify-center items-center rounded-xl px-6 py-3 border border-white/20 text-white/90 hover:bg-white/10 transition"
              >
                Додати рецепт
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-ketoGold mb-12 text-center">
          Категорії рецептів
        </h2>
        <CategoriesGrid />
      </section>
    </>
  );
}
