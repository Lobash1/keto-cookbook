export default function RecipePage({ params }: { params: { id: string } }) {
  return <div className="text-white p-6"> Рецепт № {params.id}</div>;
}
