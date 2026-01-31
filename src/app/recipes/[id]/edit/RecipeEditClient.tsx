"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { useToast } from "@/components/toast/ToastProvider";
import type { Recipe } from "@/types/recipe";

type Props = { id: string };

type RecipeDoc = Recipe;

type KcalKey = "calories" | "proteins" | "fats" | "carbs";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function RecipeEditClient({ id }: Props) {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [recipe, setRecipe] = useState<RecipeDoc | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [photoPath, setPhotoPath] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");

  const isOwner = useMemo(() => {
    const uid = auth.currentUser?.uid ?? null;
    return !!uid && recipe?.authorId === uid;
  }, [recipe]);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "recipes", id));
        if (!snap.exists()) {
          showToast("Рецепт не знайдено", "error", 3000);
          router.push("/recipes");
          return;
        }

        const data = snap.data() as Omit<Recipe, "id"> & {
          photoPath?: string;
          photo?: string;
        };

        const docRecipe: RecipeDoc = { ...data, id } as RecipeDoc;

        setRecipe(docRecipe);
        setPhotoUrl(docRecipe.photo || "");
        setPhotoPath(data.photoPath ?? "");
      } catch (e) {
        console.error(e);
        showToast("Помилка завантаження рецепта", "error", 3000);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, router, showToast]);

  useEffect(() => {
    if (!loading && recipe && !isOwner) {
      showToast("Редагувати може лише автор рецепта", "error", 3000);
      router.push(`/recipes/${id}`);
    }
  }, [loading, recipe, isOwner, router, id, showToast]);

  const onChangeText = (key: "name" | "description" | "category") => {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setRecipe((prev) => (prev ? { ...prev, [key]: value } : prev));
    };
  };

  const onChangeNumber = (key: "time") => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = toNumber(e.target.value);
      setRecipe((prev) => (prev ? { ...prev, [key]: value } : prev));
    };
  };

  const onChangeKcal = (key: KcalKey) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = toNumber(e.target.value);
      setRecipe((prev) =>
        prev ? { ...prev, kcal: { ...prev.kcal, [key]: value } } : prev
      );
    };
  };

  const onChangeMultiline =
    (key: "ingredients" | "steps") =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const lines = e.target.value
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      setRecipe((prev) => (prev ? { ...prev, [key]: lines } : prev));
    };

  const ingredientsText = recipe?.ingredients?.join("\n") ?? "";
  const stepsText = recipe?.steps?.join("\n") ?? "";

  const handlePickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setNewImageFile(file);
  };

  const onSave = async () => {
    if (!recipe) return;

    if (!recipe.name.trim()) {
      showToast("Назва рецепта обовʼязкова", "error", 2500);
      return;
    }

    try {
      setSaving(true);

      let nextPhotoUrl = photoUrl;
      let nextPhotoPath = photoPath;

      if (newImageFile) {
        const newPath = `recipes/${id}/${Date.now()}_${newImageFile.name}`;
        const newRef = ref(storage, newPath);

        await uploadBytes(newRef, newImageFile);
        nextPhotoUrl = await getDownloadURL(newRef);
        nextPhotoPath = newPath;

        if (photoPath) {
          try {
            await deleteObject(ref(storage, photoPath));
          } catch (e) {
            console.warn("Old photo delete failed:", e);
          }
        }
      }

      const payload: Partial<Recipe> & { photoPath?: string; photo?: string } =
        {
          name: recipe.name,
          description: recipe.description || "",
          category: recipe.category,
          time: recipe.time ?? 0,
          ingredients: recipe.ingredients ?? [],
          steps: recipe.steps ?? [],
          kcal: {
            calories: recipe.kcal?.calories ?? 0,
            proteins: recipe.kcal?.proteins ?? 0,
            fats: recipe.kcal?.fats ?? 0,
            carbs: recipe.kcal?.carbs ?? 0,
          },
          url: recipe.url?.trim() || "",
          photo: nextPhotoUrl,
          photoPath: nextPhotoPath,
        };

      await updateDoc(doc(db, "recipes", id), payload);

      showToast("Зміни збережено ✅", "success", 2200);
      router.push(`/recipes/${id}`);
    } catch (e) {
      console.error(e);
      showToast("Не вдалося зберегти зміни", "error", 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Завантаження…</p>;
  if (!recipe) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-[color:var(--foreground)]">
      <h1 className="text-2xl font-bold text-ketoGold mb-6">
        Редагувати рецепт
      </h1>

      <div className="space-y-4">
        <input
          value={recipe.name}
          onChange={onChangeText("name")}
          placeholder="Назва рецепту"
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        <textarea
          value={recipe.description ?? ""}
          onChange={onChangeText("description")}
          placeholder="Короткий опис"
          rows={2}
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        <select
          value={recipe.category}
          onChange={onChangeText("category")}
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
          <p className="text-sm text-[color:var(--foreground)]/70">Фото</p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePickFile}
            className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
          />
          {newImageFile ? (
            <p className="text-xs text-ketoWhite/70">
              Новий файл: {newImageFile.name}
            </p>
          ) : (
            <p className="text-xs text-ketoWhite/70">
              Поточне фото: {photoUrl ? "є" : "немає"}
            </p>
          )}
        </div>

        <input
          type="number"
          value={recipe.time ?? 0}
          onChange={onChangeNumber("time")}
          placeholder="Час приготування (хв)"
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        {/* КБЖУ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input
            type="number"
            value={recipe.kcal?.calories ?? 0}
            onChange={onChangeKcal("calories")}
            placeholder="Ккал"
            className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
          />
          <input
            type="number"
            value={recipe.kcal?.proteins ?? 0}
            onChange={onChangeKcal("proteins")}
            placeholder="Білки"
            className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
          />
          <input
            type="number"
            value={recipe.kcal?.fats ?? 0}
            onChange={onChangeKcal("fats")}
            placeholder="Жири"
            className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
          />
          <input
            type="number"
            value={recipe.kcal?.carbs ?? 0}
            onChange={onChangeKcal("carbs")}
            placeholder="Вуглеводи"
            className="p-3 rounded-xl bg-black/30 border border-ketoRed/40"
          />
        </div>

        <textarea
          value={ingredientsText}
          onChange={onChangeMultiline("ingredients")}
          placeholder="Інгредієнти (кожен з нового рядка)"
          rows={4}
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        <textarea
          value={stepsText}
          onChange={onChangeMultiline("steps")}
          placeholder="Спосіб приготування (кожен з нового рядка)"
          rows={4}
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        <label className="block text-sm mb-1">TikTok або YouTube link</label>
        <input
          type="url"
          value={recipe.url ?? ""}
          onChange={(e) =>
            setRecipe((prev) =>
              prev ? { ...prev, url: e.target.value } : prev
            )
          }
          placeholder="https://..."
          className="w-full p-3 rounded-xl bg-black/30 border border-ketoRed/40"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex-1 rounded-xl bg-ketoGold text-ketoBlack py-3 font-semibold hover:bg-ketoGold/90 transition disabled:opacity-50"
          >
            {saving ? "Зберігаю..." : "Зберегти зміни"}
          </button>

          <button
            type="button"
            onClick={() => router.push(`/recipes/${id}`)}
            className="px-5 rounded-xl border border-ketoGold/60 text-ketoGold hover:opacity-80 transition"
          >
            Скасувати
          </button>
        </div>
      </div>
    </section>
  );
}
