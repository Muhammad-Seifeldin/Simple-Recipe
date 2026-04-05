import * as z from "zod";

export const recipeSubmissionSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Please enter a valid email"),
	recipeName: z.string().min(3, "Recipe name must be at least 3 characters"),
	cuisine: z.string().min(2, "Please enter a cuisine type"),
	difficulty: z.enum(["Easy", "Medium", "Hard"], {
		error: "Please select a difficulty level",
	}),
	prepTime: z.string().min(1, "Prep time is required"),
	cookTime: z.string().min(1, "Cook time is required"),
	servings: z.string().min(1, "Servings is required"),
	ingredients: z.string().min(10, "Please list at least a few ingredients"),
	instructions: z.string().min(20, "Please provide some instructions"),
	message: z.string().optional(),
});

export const cookingLessonsSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Please enter a valid email"),
	phone: z.string().min(10, "Please enter a valid phone number"),
	experience: z.enum(["Beginner", "Intermediate", "Advanced"], {
		error: "Please select your experience level",
	}),
	preferredDays: z.string().min(2, "Please specify your preferred days"),
	preferredTime: z.enum(["Morning", "Afternoon", "Evening"], {
		error: "Please select a preferred time",
	}),
	cuisineInterest: z
		.string()
		.min(2, "Please enter a cuisine you are interested in"),
	goals: z.string().min(10, "Please tell us about your cooking goals"),
	message: z.string().optional(),
});

export type RecipeSubmissionFormData = z.infer<typeof recipeSubmissionSchema>;
export type CookingLessonsFormData = z.infer<typeof cookingLessonsSchema>;
