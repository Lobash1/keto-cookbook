import AddRecipeForm from "./AddRecipeForm";

export default function AddRecipePage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-10 text-white">
      <h2 className="text-3xl font-bold text-ketoGold mb-6">
        Додати новий рецепт
      </h2>

      <AddRecipeForm />
    </section>
  );
}
