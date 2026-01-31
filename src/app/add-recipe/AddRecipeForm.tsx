"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { useToast } from "@/components/toast/ToastProvider";
import { Recipe } from "@/types/recipe";

export default function AddRecipeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      setLoading(true);

      if (!imageFile) {
        showToast("Будь ласка, обери фото.", "info");
        return;
      }

      const safeName = imageFile.name.replace(/\s+/g, "_");
      const photoPath = `recipes/${
        auth.currentUser?.uid ?? "anon"
      }/${Date.now()}_${safeName}`;
      const storageRef = ref(storage, photoPath);

      await uploadBytes(storageRef, imageFile);
      const photo = await getDownloadURL(storageRef);

      // 2) Create Firestore doc
      const recipe = {
        name: formData.get("name") as string,
        description: (formData.get("description") as string) || "",
        category: (formData.get("category") as Recipe["category"]) ?? "other",
        time: Number(formData.get("time")) || 0,
        photo,
        photoPath,
        ingredients: (formData.get("ingredients") as string)
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean),
        steps: (formData.get("steps") as string)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        kcal: {
          calories: Number(formData.get("calories")) || 0,
          proteins: Number(formData.get("proteins")) || 0,
          fats: Number(formData.get("fats")) || 0,
          carbs: Number(formData.get("carbs")) || 0,
        },
        url: url?.trim() || "",
        authorId: auth.currentUser?.uid || null,
        authorName: auth.currentUser?.displayName || null,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "recipes"), recipe);

      showToast("Рецепт успішно додано!", "success");

      // 3) Redirect
      router.push(`/recipes/${docRef.id}`);
    } catch (error) {
      console.error(error);

      showToast("Помилка при додаванні рецепта", "error");
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
        defaultValue="other"
        className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
      >
        <option value="meat">Мясо</option>
        <option value="poultry">Птиця</option>
        <option value="fish">Риба</option>
        <option value="dessert">Десерти</option>
        <option value="vegetables">Овочі</option>
        <option value="other">Інше</option>
      </select>

      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />
        {imageFile && (
          <p className="text-xs text-ketoWhite/70">
            Обраний файл: {imageFile.name}
          </p>
        )}
      </div>

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

      <label className="block text-sm text-ketoWhite/80">
        TikTok або YouTube link
      </label>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
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
