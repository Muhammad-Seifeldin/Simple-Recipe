import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FormOption } from "./OptionSelector";

interface SuccessPromptProps {
	option: FormOption;
	onReset: () => void;
}

const messages = {
	recipe: {
		title: "Recipe submitted successfully!",
		description:
			"Thank you for sharing your recipe. Our team will review it and get back to you within 3–5 business days.",
	},
	lessons: {
		title: "Request received!",
		description:
			"Thank you for your interest in cooking lessons. One of our chefs will reach out to you within 48 hours to confirm the details.",
	},
};

export function SuccessPrompt({ option, onReset }: SuccessPromptProps) {
	const { title, description } = messages[option];

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
			className="flex flex-col items-center justify-center text-center py-16 px-6"
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					duration: 0.5,
					delay: 0.1,
					type: "spring",
					stiffness: 200,
				}}
				className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6"
			>
				<CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
			</motion.div>

			<motion.h2
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className="text-2xl font-semibold text-foreground mb-3"
			>
				{title}
			</motion.h2>

			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="text-muted-foreground max-w-[400px] leading-relaxed mb-8"
			>
				{description}
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.4 }}
			>
				<Button onClick={onReset} variant="outline">
					Submit another
				</Button>
			</motion.div>
		</motion.div>
	);
}
