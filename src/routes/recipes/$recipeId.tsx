import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
	Clock,
	ChefHat,
	Star,
	Users,
	Flame,
	ArrowLeft,
	Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecipe } from "@/hooks/useRecipe";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipes/$recipeId")({
	component: RecipeDetailPage,
});

function RecipeDetailSkeleton() {
	return (
		<div className="max-w-[900px] mx-auto px-6 py-10">
			<Skeleton className="h-5 w-24 mb-8" />
			<Skeleton className="h-10 w-3/4 mb-4" />
			<Skeleton className="w-full h-[450px] rounded-2xl mb-8" />
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{Array.from({ length: 4 }, (_, i) => `stat-${i}`).map((id) => (
					<Skeleton key={id} className="h-20 rounded-xl" />
				))}
			</div>
			<Skeleton className="h-6 w-32 mb-4" />
			{Array.from({ length: 6 }, (_, i) => `ing-${i}`).map((id) => (
				<Skeleton key={id} className="h-4 w-full mb-2" />
			))}
		</div>
	);
}

function RecipeDetailPage() {
	const { recipeId } = Route.useParams();
	const { data: recipe, isPending, isError } = useRecipe(Number(recipeId));

	if (isPending) return <RecipeDetailSkeleton />;

	if (isError || !recipe) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
				<p className="text-muted-foreground">Recipe not found.</p>
				<Link
					to="/"
					className="text-sm text-primary hover:underline flex items-center gap-1"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to recipes
				</Link>
			</div>
		);
	}

	const stats = [
		{ icon: Clock, label: "Prep Time", value: `${recipe.prepTimeMinutes} min` },
		{
			icon: ChefHat,
			label: "Cook Time",
			value: `${recipe.cookTimeMinutes} min`,
		},
		{ icon: Users, label: "Servings", value: recipe.servings },
		{
			icon: Flame,
			label: "Calories",
			value: `${recipe.caloriesPerServing} kcal`,
		},
	];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="max-w-[900px] mx-auto px-6 py-10"
		>
			<Link
				to="/"
				className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to recipes
			</Link>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<div className="flex flex-wrap items-center gap-2 mb-3">
					<Badge
						className={cn(
							"text-xs font-medium",
							recipe.difficulty === "Easy"
								? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
								: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
						)}
					>
						{recipe.difficulty}
					</Badge>
					<Badge variant="secondary">{recipe.cuisine}</Badge>
					{recipe.mealType.map((mt) => (
						<Badge key={mt} variant="outline">
							{mt}
						</Badge>
					))}
				</div>

				<h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 leading-tight">
					{recipe.name}
				</h1>

				<div className="flex items-center gap-2 mb-6">
					<div className="flex items-center gap-1 text-amber-500">
						{Array.from({ length: 5 }, (_, i) => `star-${i}`).map((id, i) => (
							<Star
								key={id}
								className={cn(
									"w-4 h-4",
									i < Math.round(recipe.rating)
										? "fill-amber-500"
										: "fill-muted stroke-muted-foreground",
								)}
							/>
						))}
					</div>
					<span className="text-sm font-medium">
						{recipe.rating.toFixed(1)}
					</span>
					<span className="text-sm text-muted-foreground">
						({recipe.reviewCount} reviews)
					</span>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.98 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className="rounded-2xl overflow-hidden mb-8"
			>
				<img
					src={recipe.image}
					alt={recipe.name}
					className="w-full object-cover max-h-[450px]"
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
			>
				{stats.map(({ icon: Icon, label, value }) => (
					<div
						key={label}
						className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 p-4 text-center"
					>
						<Icon className="w-5 h-5 text-primary" />
						<span className="text-xs text-muted-foreground">{label}</span>
						<span className="text-sm font-semibold text-foreground">
							{value}
						</span>
					</div>
				))}
			</motion.div>

			<div className="grid md:grid-cols-2 gap-10">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.4 }}
				>
					<h2 className="text-xl font-semibold text-foreground mb-4">
						Ingredients
					</h2>
					<ul className="flex flex-col gap-2">
						{recipe.ingredients.map((ingredient) => (
							<li
								key={ingredient}
								className="flex items-start gap-2 text-sm text-foreground"
							>
								<span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
								{ingredient}
							</li>
						))}
					</ul>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.5 }}
				>
					<h2 className="text-xl font-semibold text-foreground mb-4">
						Instructions
					</h2>
					<ol className="flex flex-col gap-4">
						{recipe.instructions.map((step, i) => (
							<li key={step} className="flex items-start gap-3 text-sm">
								<span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center mt-0.5">
									{i + 1}
								</span>
								<span className="text-foreground leading-relaxed">{step}</span>
							</li>
						))}
					</ol>
				</motion.div>
			</div>

			{recipe.tags.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.6 }}
					className="mt-10"
				>
					<Separator className="mb-6" />
					<div className="flex items-center gap-2 flex-wrap">
						<Tag className="w-4 h-4 text-muted-foreground" />
						{recipe.tags.map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>
				</motion.div>
			)}
		</motion.div>
	);
}
