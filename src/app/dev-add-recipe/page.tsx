"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";

export default function DevAddRecipePage() {
  const addRecipe = async () => {
    if (!auth.currentUser) {
      alert("Спочатку увійди через Google");
      return;
    }

    await addDoc(collection(db, "recipes"), {
      name: "Тестовий кето-рецепт",
      description: "Перевірка Firestore",
      category: "dessert",
      time: 15,
      ingredients: ["яйце", "псиліум"],
      steps: ["Змішати", "Запекти"],
      kcal: {
        calories: 100,
        proteins: 5,
        fats: 7,
        carbs: 1,
      },
      photo: "/placeholder.jpg",
      authorId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
    });

    alert("Рецепт додано ✅");
  };

  return (
    <div className="p-6 text-white">
      <button
        onClick={addRecipe}
        className="rounded-xl bg-ketoGold text-ketoBlack px-5 py-3 font-semibold"
      >
        Додати тестовий рецепт
      </button>
    </div>
  );
}
