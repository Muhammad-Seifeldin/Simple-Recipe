import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	PaginationEllipsis,
} from "@/components/ui/pagination";

interface RecipePaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function RecipePagination({
	currentPage,
	totalPages,
	onPageChange,
}: RecipePaginationProps) {
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const showEllipsisEnd = currentPage < totalPages - 2;

	const visiblePages = pages.filter((page) => {
		if (page === 1 || page === totalPages) return true;
		if (page >= currentPage - 1 && page <= currentPage + 1) return true;
		return false;
	});

	return (
		<Pagination className="mt-10">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={() => onPageChange(Math.max(1, currentPage - 1))}
						aria-disabled={currentPage === 1}
						className={
							currentPage === 1
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					/>
				</PaginationItem>

				{visiblePages.map((page, i) => (
					<>
						{i > 0 && visiblePages[i - 1] !== page - 1 && (
							<PaginationItem key={`ellipsis-${page}`}>
								<PaginationEllipsis />
							</PaginationItem>
						)}
						<PaginationItem key={page}>
							<PaginationLink
								isActive={page === currentPage}
								onClick={() => onPageChange(page)}
								className="cursor-pointer"
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					</>
				))}

				{showEllipsisEnd && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
						aria-disabled={currentPage === totalPages}
						className={
							currentPage === totalPages
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
