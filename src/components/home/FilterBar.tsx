import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { FilterState } from "@/types/recipe";

interface FilterBarProps {
	filters: FilterState;
	cuisines: string[];
	mealTypes: string[];
	onFilterChange: (key: keyof FilterState, value: string) => void;
	onOpenSheet: () => void;
	onClearAll: () => void;
	activeTagCount: number;
}

export function FilterBar({
	filters,
	cuisines,
	mealTypes,
	onFilterChange,
	onOpenSheet,
	onClearAll,
	activeTagCount,
}: FilterBarProps) {
	const hasActiveFilters =
		filters.search ||
		filters.difficulty ||
		filters.cuisine ||
		filters.mealType ||
		filters.rating ||
		filters.tags.length > 0;

	return (
		<div className="flex flex-wrap items-center gap-3 w-full">
			<div className="relative flex-1 min-w-[200px]">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
				<Input
					placeholder="Search recipes or tags..."
					value={filters.search}
					onChange={(e) => onFilterChange("search", e.target.value)}
					className="pl-9"
				/>
			</div>

			<Select
				value={filters.difficulty}
				onValueChange={(value) => onFilterChange("difficulty", value)}
			>
				<SelectTrigger className="w-[140px]">
					<SelectValue placeholder="Difficulty" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Easy">Easy</SelectItem>
					<SelectItem value="Medium">Medium</SelectItem>
				</SelectContent>
			</Select>

			<Select
				value={filters.cuisine}
				onValueChange={(value) => onFilterChange("cuisine", value)}
			>
				<SelectTrigger className="w-[150px]">
					<SelectValue placeholder="Cuisine" />
				</SelectTrigger>
				<SelectContent>
					{cuisines.map((cuisine) => (
						<SelectItem key={cuisine} value={cuisine}>
							{cuisine}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={filters.mealType}
				onValueChange={(value) => onFilterChange("mealType", value)}
			>
				<SelectTrigger className="w-[150px]">
					<SelectValue placeholder="Meal Type" />
				</SelectTrigger>
				<SelectContent>
					{mealTypes.map((mt) => (
						<SelectItem key={mt} value={mt}>
							{mt}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select
				value={filters.rating}
				onValueChange={(value) => onFilterChange("rating", value)}
			>
				<SelectTrigger className="w-[130px]">
					<SelectValue placeholder="Rating" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="3">3★ and above</SelectItem>
					<SelectItem value="4">4★ and above</SelectItem>
					<SelectItem value="4.5">4.5★ and above</SelectItem>
				</SelectContent>
			</Select>

			<Button
				variant="outline"
				onClick={onOpenSheet}
				className="flex items-center gap-2"
			>
				<SlidersHorizontal className="w-4 h-4" />
				More Filters
				{activeTagCount > 0 && (
					<span className="ml-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
						{activeTagCount}
					</span>
				)}
			</Button>

			{hasActiveFilters && (
				<Button
					variant="ghost"
					onClick={onClearAll}
					className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
				>
					<X className="w-4 h-4" />
					Clear all
				</Button>
			)}
		</div>
	);
}
