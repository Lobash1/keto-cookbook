import RecipePageClient from "./RecipePageClient";

type RecipePageProps = {
  params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;

  return <RecipePageClient id={id} />;
}
