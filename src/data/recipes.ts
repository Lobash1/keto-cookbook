import { Recipe } from "@/types/recipe";

export const recipes: Recipe[] = [
  {
    name: "Булочка",
    id: "bulka",
    description: "Дієтична булочка без муки",
    photo: "/bulka.jpg",
    ingredients: ["яйца", "псиліум", "розпушувач"],
    kcal: { calories: 64, proteins: 2.7, fats: 0, carbs: 0.9 },
    category: "dessert",
    time: 25,
  },
];
