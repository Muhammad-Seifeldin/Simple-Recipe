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
	cookingLessonsSchema,
	type CookingLessonsFormData,
} from "@/schemas/formSchema";

interface CookingLessonsFormProps {
	onSuccess: () => void;
}

export function CookingLessonsForm({ onSuccess }: CookingLessonsFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		formState: { errors, isSubmitting },
	} = useForm<CookingLessonsFormData>({
		resolver: zodResolver(cookingLessonsSchema),
	});

	async function onSubmit(data: CookingLessonsFormData) {
		await fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		onSuccess();
	}

	return (
		<motion.form
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-6"
		>
			<div className="grid sm:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<Label htmlFor="name">Your Name</Label>
					<Input
						id="name"
						placeholder="Ahmed Hassan"
						{...register("name")}
						onBlur={() => trigger("name")}
						aria-invalid={!!errors.name}
					/>
					{errors.name && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.name.message}
						</motion.p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						type="email"
						placeholder="ahmed@example.com"
						{...register("email")}
						onBlur={() => trigger("email")}
						aria-invalid={!!errors.email}
					/>
					{errors.email && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.email.message}
						</motion.p>
					)}
				</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						type="tel"
						placeholder="+20 1XX XXX XXXX"
						{...register("phone")}
						onBlur={() => trigger("phone")}
						aria-invalid={!!errors.phone}
					/>
					{errors.phone && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.phone.message}
						</motion.p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="experience">Experience Level</Label>
					<Select
						onValueChange={(value) => {
							setValue(
								"experience",
								value as "Beginner" | "Intermediate" | "Advanced",
							);
							trigger("experience");
						}}
					>
						<SelectTrigger id="experience" aria-invalid={!!errors.experience}>
							<SelectValue placeholder="Select level" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Beginner">Beginner</SelectItem>
							<SelectItem value="Intermediate">Intermediate</SelectItem>
							<SelectItem value="Advanced">Advanced</SelectItem>
						</SelectContent>
					</Select>
					{errors.experience && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.experience.message}
						</motion.p>
					)}
				</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<Label htmlFor="preferredDays">Preferred Days</Label>
					<Input
						id="preferredDays"
						placeholder="e.g. Monday, Wednesday"
						{...register("preferredDays")}
						onBlur={() => trigger("preferredDays")}
						aria-invalid={!!errors.preferredDays}
					/>
					{errors.preferredDays && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.preferredDays.message}
						</motion.p>
					)}
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="preferredTime">Preferred Time</Label>
					<Select
						onValueChange={(value) => {
							setValue(
								"preferredTime",
								value as "Morning" | "Afternoon" | "Evening",
							);
							trigger("preferredTime");
						}}
					>
						<SelectTrigger
							id="preferredTime"
							aria-invalid={!!errors.preferredTime}
						>
							<SelectValue placeholder="Select time" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Morning">Morning</SelectItem>
							<SelectItem value="Afternoon">Afternoon</SelectItem>
							<SelectItem value="Evening">Evening</SelectItem>
						</SelectContent>
					</Select>
					{errors.preferredTime && (
						<motion.p
							initial={{ opacity: 0, y: -4 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-xs text-destructive"
						>
							{errors.preferredTime.message}
						</motion.p>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="cuisineInterest">Cuisine of Interest</Label>
				<Input
					id="cuisineInterest"
					placeholder="e.g. Italian, Egyptian, Japanese"
					{...register("cuisineInterest")}
					onBlur={() => trigger("cuisineInterest")}
					aria-invalid={!!errors.cuisineInterest}
				/>
				{errors.cuisineInterest && (
					<motion.p
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-xs text-destructive"
					>
						{errors.cuisineInterest.message}
					</motion.p>
				)}
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="goals">Your Cooking Goals</Label>
				<Textarea
					id="goals"
					placeholder="Tell us what you'd like to learn or improve..."
					rows={4}
					{...register("goals")}
					onBlur={() => trigger("goals")}
					aria-invalid={!!errors.goals}
				/>
				{errors.goals && (
					<motion.p
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-xs text-destructive"
					>
						{errors.goals.message}
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
					"Request Lessons"
				)}
			</Button>
		</motion.form>
	);
}
