import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe, RecipeDoc } from "@/types/recipe";

export async function fetchAllRecipes(): Promise<RecipeDoc[]> {
  // Если createdAt пока нет — orderBy убери.
  //   const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
  const q = query(collection(db, "recipes"));

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    docId: d.id,
    ...(d.data() as Recipe),
  }));
}
