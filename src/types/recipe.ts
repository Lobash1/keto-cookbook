export interface Recipe {
  name: string;
  description: string;
  photo: string;
  ingredients: string[];
  kcal: { calories: number; proteins: number; fats: number; carbs: number };
  category: "meat" | "poultry" | "fish" | "dessert" | "vegetables" | "salad";
  time: number; //minets
}
