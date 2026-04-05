import { useQuery } from "@tanstack/react-query";
import { fetchRecipe } from "@/lib/api";

export function useRecipe(id: number) {
	return useQuery({
		queryKey: ["recipe", id],
		queryFn: () => fetchRecipe(id),
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 20,
		enabled: !!id,
	});
}
