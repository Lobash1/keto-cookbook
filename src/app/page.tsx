import AuthButton from "@/components/AuthButton";
import CategoriesGrid from "@/components/CategoriesGrid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* фон-картинка */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-meat.jpg"
          alt="keto background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* основной градиент — оставляем драматичным для обеих тем */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90" />

        {/* мягкий overlay, который зависит от темы */}
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_50%)]"
          style={{ background: "var(--hero-overlay)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div
            className="max-w-4xl mx-auto rounded-3xl border border-ketoGold/30 backdrop-blur-lg p-10 md:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.7)]"
            style={{ background: "var(--card-bg)" }}
          >
            <p className="text-center text-ketoGold/80 tracking-widest uppercase text-sm mb-4">
              Keto • Low-Carb • Personal Cookbook
            </p>

            <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-ketoGold">
              Преміум Кето Рецепти
            </h1>

            <p className="text-center mt-7 text-base md:text-lg text-[color:var(--foreground)] opacity-80">
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
                className="inline-flex justify-center items-center rounded-xl px-6 py-3 
             border transition font-semibold
             hover:opacity-80"
                style={{
                  borderColor: "var(--foreground)",
                  color: "var(--foreground)",
                }}
              >
                Додати рецепт
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-6 py-16">
        <AuthButton />
        <h2 className="text-3xl font-bold text-ketoGold mb-12 text-center">
          Категорії рецептів
        </h2>
        <CategoriesGrid />
      </section>
    </>
  );
}
