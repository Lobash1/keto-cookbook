"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AddRecipeForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const recipe = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      time: Number(formData.get("time")),
      photo: formData.get("photo") as string,
      ingredients: (formData.get("ingredients") as string)
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
      steps: (formData.get("steps") as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      kcal: {
        calories: Number(formData.get("calories")),
        proteins: Number(formData.get("proteins")),
        fats: Number(formData.get("fats")),
        carbs: Number(formData.get("carbs")),
      },
      authorId: auth.currentUser?.uid || null,
      authorName: auth.currentUser?.displayName || null,
      createdAt: serverTimestamp(),
    };
    try {
      setLoading(true);
      await addDoc(collection(db, "recipes"), recipe);
      alert("Рецепт успішно додано!");
      form.reset();
      //   e.currentTarget.reset();
    } catch (error) {
      alert("Помилка при додаванні рецепта.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Назва рецепту"
        required
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />
      <textarea
        name="description"
        placeholder="Короткий опис"
        rows={2}
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />
      <select
        name="category"
        required
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      >
        <option value="meat">Мясо</option>
        <option value="poultry">Птиця</option>
        <option value="fish">Риба</option>
        <option value="dessert">Десерти</option>
        <option value="vegetables">Овочі</option>
        <option value="other">Інше</option>
      </select>

      <input
        name="photo"
        placeholder="URL фото"
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />

      <input
        type="number"
        name="time"
        placeholder="Час приготування (хв)"
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <input
          type="number"
          name="calories"
          placeholder="Ккал"
          className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />
        <input
          type="number"
          name="proteins"
          placeholder="Білки"
          className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />
        <input
          type="number"
          name="fats"
          placeholder="Жири"
          className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />
        <input
          type="number"
          name="carbs"
          placeholder="Вуглеводи"
          className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />
      </div>

      <textarea
        name="ingredients"
        placeholder="Інгредієнти (кожен з нового рядка)"
        rows={4}
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />
      <textarea
        name="steps"
        rows={4}
        placeholder="Спосіб приготування (кожен з нового рядка)"
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-ketoGold text-ketoBlack py-3 font-semibold hover:bg-ketoGold/90 transition disabled:opacity-50"
      >
        {loading ? "Додаю..." : "Додати рецепт"}
      </button>
    </form>
  );
}
