import { useQuery } from "@tanstack/react-query";
import { fetchRecipes } from "@/lib/api";

export function useRecipes() {
	return useQuery({
		queryKey: ["recipes"],
		queryFn: fetchRecipes,
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 20,
	});
}
