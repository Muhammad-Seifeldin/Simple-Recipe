import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSheetProps {
	open: boolean;
	onClose: () => void;
	tags: string[];
	selectedTags: string[];
	onTagToggle: (tag: string) => void;
	onApply: () => void;
	onClear: () => void;
}

export function FilterSheet({
	open,
	onClose,
	tags,
	selectedTags,
	onTagToggle,
	onApply,
	onClear,
}: FilterSheetProps) {
	return (
		<Sheet open={open} onOpenChange={onClose}>
			<SheetContent className="flex flex-col gap-6 w-full sm:max-w-md">
				<SheetHeader>
					<SheetTitle>Filter by Tags</SheetTitle>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto">
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => {
							const isSelected = selectedTags.includes(tag);
							return (
								<button
									key={tag}
									type="button"
									onClick={() => onTagToggle(tag)}
									className={cn(
										"px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
										isSelected
											? "bg-primary text-primary-foreground border-primary"
											: "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground",
									)}
								>
									{tag}
								</button>
							);
						})}
					</div>
				</div>

				<SheetFooter className="flex gap-2 sm:flex-row">
					<Button variant="outline" onClick={onClear} className="flex-1">
						Clear
					</Button>
					<Button onClick={onApply} className="flex-1">
						Apply Filters
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
