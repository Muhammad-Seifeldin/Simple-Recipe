import { motion } from "motion/react";
import { ChefHat, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormOption = "recipe" | "lessons";

interface OptionSelectorProps {
	selected: FormOption | null;
	onSelect: (option: FormOption) => void;
}

const options = [
	{
		id: "recipe" as FormOption,
		icon: ChefHat,
		title: "Submit a Recipe",
		description:
			"Share your own recipe with our community. If it meets our standards, we will publish it on the platform.",
	},
	{
		id: "lessons" as FormOption,
		icon: BookOpen,
		title: "Request Cooking Lessons",
		description:
			"Book a one-on-one or group cooking lesson with one of our experienced chefs in Cairo.",
	},
];

export function OptionSelector({ selected, onSelect }: OptionSelectorProps) {
	return (
		<div className="grid sm:grid-cols-2 gap-4">
			{options.map(({ id, icon: Icon, title, description }, i) => (
				<motion.button
					key={id}
					type="button"
					onClick={() => onSelect(id)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: i * 0.1 }}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className={cn(
						"flex flex-col items-start gap-4 p-6 rounded-2xl border-2 text-left transition-colors duration-200",
						selected === id
							? "border-primary bg-primary/5"
							: "border-border bg-background hover:border-primary/50",
					)}
				>
					<div
						className={cn(
							"w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
							selected === id
								? "bg-primary text-primary-foreground"
								: "bg-muted text-muted-foreground",
						)}
					>
						<Icon className="w-6 h-6" />
					</div>
					<div>
						<h3
							className={cn(
								"font-semibold mb-1 transition-colors",
								selected === id ? "text-primary" : "text-foreground",
							)}
						>
							{title}
						</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							{description}
						</p>
					</div>
				</motion.button>
			))}
		</div>
	);
}
