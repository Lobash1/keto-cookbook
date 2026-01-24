export interface Recipe {
  name: string;
  id: string;
  description: string;
  photo: string;
  photoPath?: string;
  ingredients: string[];
  steps: string[];
  kcal: { calories: number; proteins: number; fats: number; carbs: number };
  category: "meat" | "poultry" | "fish" | "dessert" | "vegetables" | "other";
  time: number; //minets
  ketoScore?: number;

  authorId: string | null;
  authorName: string | null;
}

export type RecipeDoc = Recipe & { docId: string };
