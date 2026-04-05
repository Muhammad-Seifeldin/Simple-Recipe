import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Clock, ChefHat, Star, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/types/recipe";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
	recipe: Recipe;
	index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.05 }}
		>
			<Link to="/recipes/$recipeId" params={{ recipeId: String(recipe.id) }}>
				<div className="group rounded-2xl overflow-hidden border border-border bg-background hover:shadow-lg transition-shadow duration-300">
					<div className="relative overflow-hidden">
						<img
							src={recipe.image}
							alt={recipe.name}
							className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
						<div className="absolute top-3 right-3">
							<Badge
								className={cn(
									"text-xs font-medium backdrop-blur-sm border-0",
									recipe.difficulty === "Easy"
										? "bg-green-500/80 text-white hover:bg-green-500/80"
										: "bg-orange-500/80 text-white hover:bg-orange-500/80",
								)}
							>
								{recipe.difficulty}
							</Badge>
						</div>
					</div>

					<div className="p-4 flex flex-col gap-3">
						<h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-11">
							{recipe.name}
						</h3>

						<div className="flex items-center gap-1 text-amber-500">
							<Star className="w-4 h-4 fill-amber-500" />
							<span className="text-sm font-medium text-foreground">
								{recipe.rating.toFixed(1)}
							</span>
							<span className="text-xs text-muted-foreground">
								({recipe.reviewCount})
							</span>
						</div>

						<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
							<span className="flex items-center gap-1">
								<Clock className="w-3.5 h-3.5" />
								Prep: {recipe.prepTimeMinutes}m
							</span>
							<span className="flex items-center gap-1">
								<ChefHat className="w-3.5 h-3.5" />
								Cook: {recipe.cookTimeMinutes}m
							</span>
							<span className="flex items-center gap-1 w-full">
								<UtensilsCrossed className="w-3.5 h-3.5" />
								{recipe.cuisine}
							</span>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
