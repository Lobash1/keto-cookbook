/* eslint-disable @next/next/no-img-element */

import RecipeCard from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";

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
    </>

    //     <main className="min-h-screen bg-ketoBlack text-ketoWhite p-6">
    //       <div>
    //         <img src="/hero.jpg" alt="hero" />
    //         <div></div>
    //         <div>
    //           <h1
    //             className="text-5xl text-center
    //  font-bold text-ketoGold drop-shadow-[0_0_10px_rgba(255,209,102,0.6)]
    //  mb-8"
    //           >
    //             «Преміальні Кето Рецепти»
    //           </h1>
    //           <p
    //             className="text-xl text-center
    //  font-bold text-ketoGold drop-shadow-[0_0_10px_rgba(255,209,102,0.6)]
    //  mb-8"
    //           >
    //             Корисно, смачно і без зайвих вуглеводів
    //           </p>

    //           <div>
    //             <button>М’ясо</button>
    //             <button>Птиця</button>
    //             <button>Риба</button>
    //             <button>Десерти</button>
    //             <button>Овочі</button>
    //             <button>Салати</button>
    //           </div>
    //         </div>
    //       </div>

    //       {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    //         {recipes.map((recipe) => (
    //           <RecipeCard key={recipe.name} recipe={recipe} />
    //         ))}
    //       </div> */}
    //     </main>
  );
}
