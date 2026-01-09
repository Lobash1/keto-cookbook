import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe, RecipeDoc } from "@/types/recipe";

export async function fetchAllRecipes(): Promise<RecipeDoc[]> {
  const q = query(collection(db, "recipes"));

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    docId: d.id,
    ...(d.data() as Recipe),
  }));
}
