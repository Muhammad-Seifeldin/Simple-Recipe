import { RecipesResponseSchema, RecipeSchema } from "@/schemas/recipeSchema";
import type { RecipesResponse, Recipe } from "@/types/recipe";

const BASE_URL = "https://dummyjson.com/recipes";

export async function fetchRecipes(): Promise<RecipesResponse> {
	const res = await fetch(`${BASE_URL}?limit=0`);
	if (!res.ok) throw new Error("Failed to fetch recipes");
	const data = await res.json();
	return RecipesResponseSchema.parse(data);
}

export async function fetchRecipe(id: number): Promise<Recipe> {
	const res = await fetch(`${BASE_URL}/${id}`);
	if (!res.ok) throw new Error("Failed to fetch recipe");
	const data = await res.json();
	return RecipeSchema.parse(data);
}
