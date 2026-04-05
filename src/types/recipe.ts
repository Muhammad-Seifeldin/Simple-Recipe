export type Difficulty = "Easy" | "Medium";

export interface Recipe {
	id: number;
	name: string;
	ingredients: string[];
	instructions: string[];
	prepTimeMinutes: number;
	cookTimeMinutes: number;
	servings: number;
	difficulty: Difficulty;
	cuisine: string;
	caloriesPerServing: number;
	tags: string[];
	userId: number;
	image: string;
	rating: number;
	reviewCount: number;
	mealType: string[];
}

export interface RecipesResponse {
	recipes: Recipe[];
	total: number;
	skip: number;
	limit: number;
}

export interface FilterState {
	search: string;
	difficulty: string;
	cuisine: string;
	mealType: string;
	rating: string;
	tags: string[];
}
