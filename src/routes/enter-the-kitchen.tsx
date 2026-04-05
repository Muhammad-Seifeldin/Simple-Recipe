import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "@/components/ui/separator";
import {
	OptionSelector,
	type FormOption,
} from "@/components/form/OptionSelector";
import { RecipeSubmissionForm } from "@/components/form/RecipeSubmissionForm";
import { CookingLessonsForm } from "@/components/form/CookingLessonsForm";
import { SuccessPrompt } from "@/components/form/SuccessPrompt";

export const Route = createFileRoute("/enter-the-kitchen")({
	component: EnterTheKitchenPage,
});

function EnterTheKitchenPage() {
	const [selectedOption, setSelectedOption] = useState<FormOption | null>(null);
	const [submitted, setSubmitted] = useState(false);

	function handleReset() {
		setSelectedOption(null);
		setSubmitted(false);
	}

	return (
		<div className="max-w-[800px] mx-auto px-6 py-16">
			<AnimatePresence mode="wait">
				{submitted && selectedOption ? (
					<motion.div
						key="success"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<SuccessPrompt option={selectedOption} onReset={handleReset} />
					</motion.div>
				) : (
					<motion.div
						key="form"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-10"
						>
							<h1 className="text-4xl font-semibold text-foreground mb-3">
								Enter the Kitchen
							</h1>
							<p className="text-muted-foreground leading-relaxed">
								Choose how you would like to get involved. Submit your own
								recipe to be featured on our platform, or book a cooking lesson
								with one of our experienced chefs in Cairo.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="mb-8"
						>
							<OptionSelector
								selected={selectedOption}
								onSelect={setSelectedOption}
							/>
						</motion.div>

						<AnimatePresence mode="wait">
							{selectedOption && (
								<motion.div
									key={selectedOption}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.4 }}
								>
									<Separator className="mb-8" />
									<h2 className="text-xl font-semibold text-foreground mb-6">
										{selectedOption === "recipe"
											? "Recipe Details"
											: "Lesson Request Details"}
									</h2>
									{selectedOption === "recipe" ? (
										<RecipeSubmissionForm
											onSuccess={() => setSubmitted(true)}
										/>
									) : (
										<CookingLessonsForm onSuccess={() => setSubmitted(true)} />
									)}
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
