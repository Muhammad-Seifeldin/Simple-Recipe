import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { RecipeGrid } from "@/components/home/RecipeGrid";
import { FilterBar } from "@/components/home/FilterBar";
import { FilterSheet } from "@/components/home/FilterSheet";
import { RecipePagination } from "@/components/home/RecipePagination";
import { useRecipes } from "@/hooks/useRecipes";
import {
	filterRecipes,
	getUniqueCuisines,
	getUniqueMealTypes,
	getUniqueTags,
} from "@/lib/filters";
import type { FilterState } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 12;

const defaultFilters: FilterState = {
	search: "",
	difficulty: "",
	cuisine: "",
	mealType: "",
	rating: "",
	tags: [],
};

export const Route = createFileRoute("/")({
	component: HomePage,
});

function RecipeGridSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{Array.from({ length: 12 }, (_, i) => `skeleton-${i}`).map((id) => (
				<div
					key={id}
					className="rounded-2xl overflow-hidden border border-border"
				>
					<Skeleton className="w-full h-52" />
					<div className="p-4 flex flex-col gap-3">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}

function HomePage() {
	const { data, isPending, isError } = useRecipes();
	const [filters, setFilters] = useState<FilterState>(defaultFilters);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [pendingTags, setPendingTags] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const allRecipes = data?.recipes ?? [];

	const cuisines = useMemo(() => getUniqueCuisines(allRecipes), [allRecipes]);
	const mealTypes = useMemo(() => getUniqueMealTypes(allRecipes), [allRecipes]);
	const tags = useMemo(() => getUniqueTags(allRecipes), [allRecipes]);

	const filteredRecipes = useMemo(
		() => filterRecipes(allRecipes, filters),
		[allRecipes, filters],
	);

	const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);

	const paginatedRecipes = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredRecipes.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredRecipes, currentPage]);

	function handleFilterChange(key: keyof FilterState, value: string) {
		setFilters((prev) => ({ ...prev, [key]: value }));
		setCurrentPage(1);
	}

	function handleClearAll() {
		setFilters(defaultFilters);
		setPendingTags([]);
		setCurrentPage(1);
	}

	function handleTagToggle(tag: string) {
		setPendingTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	}

	function handleApplyTags() {
		setFilters((prev) => ({ ...prev, tags: pendingTags }));
		setCurrentPage(1);
		setSheetOpen(false);
	}

	function handleClearTags() {
		setPendingTags([]);
		setFilters((prev) => ({ ...prev, tags: [] }));
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function handleOpenSheet() {
		setPendingTags(filters.tags);
		setSheetOpen(true);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<p className="text-muted-foreground">
					Something went wrong. Try again.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-[1200px] mx-auto px-6 py-10">
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="mb-8"
			>
				<h1 className="text-3xl font-semibold text-foreground mb-1">Recipes</h1>
				<p className="text-muted-foreground text-sm">
					{isPending ? "Loading..." : `${filteredRecipes.length} recipes found`}
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.1 }}
				className="mb-8"
			>
				<FilterBar
					filters={filters}
					cuisines={cuisines}
					mealTypes={mealTypes}
					onFilterChange={handleFilterChange}
					onOpenSheet={handleOpenSheet}
					onClearAll={handleClearAll}
					activeTagCount={filters.tags.length}
				/>
			</motion.div>

			{isPending ? (
				<RecipeGridSkeleton />
			) : (
				<>
					<RecipeGrid recipes={paginatedRecipes} />
					<RecipePagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</>
			)}

			<FilterSheet
				open={sheetOpen}
				onClose={() => setSheetOpen(false)}
				tags={tags}
				selectedTags={pendingTags}
				onTagToggle={handleTagToggle}
				onApply={handleApplyTags}
				onClear={handleClearTags}
			/>
		</div>
	);
}
