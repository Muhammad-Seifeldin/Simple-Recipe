import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "@/types/recipe";

interface RecipeGridProps {
	recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
	if (recipes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<p className="text-lg font-medium text-foreground">No recipes found.</p>
				<p className="text-sm text-muted-foreground mt-1">
					Try fewer filters or search for something else.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{recipes.map((recipe, index) => (
				<RecipeCard key={recipe.id} recipe={recipe} index={index} />
			))}
		</div>
	);
}
