import type { Recipe, FilterState } from "@/types/recipe";

export function filterRecipes(
	recipes: Recipe[],
	filters: FilterState,
): Recipe[] {
	return recipes.filter((recipe) => {
		if (filters.search) {
			const query = filters.search.toLowerCase();
			const matchesTitle = recipe.name.toLowerCase().includes(query);
			const matchesTags = recipe.tags.some((tag) =>
				tag.toLowerCase().includes(query),
			);
			if (!matchesTitle && !matchesTags) return false;
		}

		if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
			return false;
		}

		if (filters.cuisine && recipe.cuisine !== filters.cuisine) {
			return false;
		}

		if (filters.mealType) {
			const matches = recipe.mealType.some((mt) => mt === filters.mealType);
			if (!matches) return false;
		}

		if (filters.rating) {
			const minRating = parseFloat(filters.rating);
			if (recipe.rating < minRating) return false;
		}

		if (filters.tags.length > 0) {
			const matches = filters.tags.every((tag) => recipe.tags.includes(tag));
			if (!matches) return false;
		}

		return true;
	});
}

export function getUniqueCuisines(recipes: Recipe[]): string[] {
	return [...new Set(recipes.map((r) => r.cuisine))].sort();
}

export function getUniqueMealTypes(recipes: Recipe[]): string[] {
	return [...new Set(recipes.flatMap((r) => r.mealType))].sort();
}

export function getUniqueTags(recipes: Recipe[]): string[] {
	return [...new Set(recipes.flatMap((r) => r.tags))].sort();
}
