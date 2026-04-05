import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	recipeSubmissionSchema,
	type RecipeSubmissionFormData,
} from "@/schemas/formSchema";

interface RecipeSubmissionFormProps {
	onSuccess: () => void;
}

export function RecipeSubmissionForm({ onSuccess }: RecipeSubmissionFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		formState: { errors, isSubmitting },
	} = useForm<RecipeSubmissionFormData>({
		resolver: zodResolver(recipeSubmissionSchema),
	});

	async function onSubmit(data: RecipeSubmissionFormData) {
		await fetch("https://httpbin.org/post", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		onSuccess();
	}

	const fields = [
		{
			id: "name",
			label: "Your Name",
			placeholder: "Ahmed Hassan",
			type: "text",
		},
		{
			id: "email",
			label: "Email Address",
			placeholder: "ahmed@example.com",
			type: "email",
		},
		{
			id: "recipeName",
			label: "Recipe Name",
			placeholder: "Grandma's Koshari",
			type: "text",
		},
		{
			id: "cuisine",
			label: "Cuisine Type",
			placeholder: "Egyptian",
			type: "text",
		},
	] as const;

	return (
		<motion.form
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-6"
		>
			<div className="grid sm:grid-cols-2 gap-6">
				{fields.map(({ id, label, placeholder, type }) => (
					<div key={id} className="flex flex-col gap-2">
						<Label htmlFor={id}>{label}</Label>
						<Input
							id={id}
							type={type}
							placeholder={placeholder}
							{...register(id)}
							onBlur={() => trigger(id)}
							aria-invalid={!!errors[id]}
						/>
						{errors[id] && (
							<motion.p
								initial={{ opacity: 0, y: -4 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-xs text-destructive"
							>
								{errors[id]?.message}
							</motion.p>
						)}
					</div>
				))}
			</div>

			<div className="grid sm:grid-cols-3 gap-6">
				<div className="flex flex-col gap-2">
					<Label htmlFor="difficulty">Difficulty</Label>
					<Select
						onValueChange={(value) => {
							setValue("difficulty", value as "Easy" | "Medium" | "Hard");
							trigger("difficulty");
						}}
					>
						<SelectTrigger id="difficulty" aria-invalid={!!errors.difficulty}>
							<SelectValue placeholder="Select difficulty" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Easy">Easy</SelectItem>
							<SelectItem value="Medium">Medium</SelectItem>
							<SelectItem value="Hard">Hard</SelectItem>
						</SelectContent>
					</Select>
					{errors.difficulty && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.difficulty.message}
						</motion.p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="prepTime">Prep Time (min)</Label>
					<Input
						id="prepTime"
						type="number"
						placeholder="20"
						{...register("prepTime")}
						onBlur={() => trigger("prepTime")}
						aria-invalid={!!errors.prepTime}
					/>
					{errors.prepTime && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.prepTime.message}
						</motion.p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="cookTime">Cook Time (min)</Label>
					<Input
						id="cookTime"
						type="number"
						placeholder="30"
						{...register("cookTime")}
						onBlur={() => trigger("cookTime")}
						aria-invalid={!!errors.cookTime}
					/>
					{errors.cookTime && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.cookTime.message}
						</motion.p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="servings">Servings</Label>
				<Input
					id="servings"
					type="number"
					placeholder="4"
					className="w-32"
					{...register("servings")}
					onBlur={() => trigger("servings")}
					aria-invalid={!!errors.servings}
				/>
				{errors.servings && (
					<motion.p
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-xs text-destructive"
					>
						{errors.servings.message}
					</motion.p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="ingredients">Ingredients</Label>
				<Textarea
					id="ingredients"
					placeholder="List each ingredient on a new line..."
					rows={5}
					{...register("ingredients")}
					onBlur={() => trigger("ingredients")}
					aria-invalid={!!errors.ingredients}
				/>
				{errors.ingredients && (
					<motion.p
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-xs text-destructive"
					>
						{errors.ingredients.message}
					</motion.p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="instructions">Instructions</Label>
				<Textarea
					id="instructions"
					placeholder="Describe each step clearly..."
					rows={6}
					{...register("instructions")}
					onBlur={() => trigger("instructions")}
					aria-invalid={!!errors.instructions}
				/>
				{errors.instructions && (
					<motion.p
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-xs text-destructive"
					>
						{errors.instructions.message}
					</motion.p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="message">
					Additional Notes{" "}
					<span className="text-muted-foreground text-xs">(optional)</span>
				</Label>
				<Textarea
					id="message"
					placeholder="Anything else you'd like us to know..."
					rows={3}
					{...register("message")}
				/>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full sm:w-auto"
			>
				{isSubmitting ? (
					<>
						<Loader2 className="w-4 h-4 animate-spin mr-2" />
						Submitting...
					</>
				) : (
					"Submit Recipe"
				)}
			</Button>
		</motion.form>
	);
}
