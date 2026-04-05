import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Zap, Layout, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

const principles = [
	{
		icon: Lightbulb,
		title: "Clarity over creativity",
		description:
			"Every design and content decision prioritizes understanding over impressiveness. If it needs explaining, we simplify it first.",
	},
	{
		icon: Layout,
		title: "Function over decoration",
		description:
			"Every element on the page earns its place. We strip away anything that doesn't help you cook better or find recipes faster.",
	},
	{
		icon: Zap,
		title: "Speed over features",
		description:
			"A fast, simple experience beats a slow, feature-heavy one every time. We keep the interface light so you can focus on cooking.",
	},
	{
		icon: Heart,
		title: "Less, but better",
		description:
			"We believe in doing fewer things exceptionally well. Fifty carefully curated recipes done right beat five hundred done carelessly.",
	},
];

const stats = [
	{ value: "50+", label: "Curated recipes" },
	{ value: "15+", label: "World cuisines" },
	{ value: "0", label: "Ads or distractions" },
	{ value: "100%", label: "Free to use" },
];

function AboutPage() {
	return (
		<div className="max-w-[900px] mx-auto px-6 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-16"
			>
				<h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-tight">
					Only what you need.
				</h1>
				<p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
					Simple Recipe is built for people who just want to cook — without the
					noise. Most recipe platforms overwhelm you with too many options, too
					many steps, and too much clutter. We take a different approach.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
			>
				{stats.map(({ value, label }) => (
					<div
						key={label}
						className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-border bg-muted/30"
					>
						<span className="text-3xl font-semibold text-primary mb-1">
							{value}
						</span>
						<span className="text-sm text-muted-foreground">{label}</span>
					</div>
				))}
			</motion.div>

			<Separator className="mb-16" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="mb-16"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-3">
					Our mission
				</h2>
				<p className="text-muted-foreground leading-relaxed mb-4">
					To make finding and using recipes effortless by removing unnecessary
					complexity. We believe cooking should feel simple from the very start
					— from the moment you open the app to the moment you plate your dish.
				</p>
				<p className="text-muted-foreground leading-relaxed">
					We focus on clarity. Clean layouts, straightforward instructions, and
					only the information you actually need. No distractions. No
					unnecessary features. Just simple recipes, done right.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="mb-16"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-8">
					What we stand for
				</h2>
				<div className="grid sm:grid-cols-2 gap-6">
					{principles.map(({ icon: Icon, title, description }, i) => (
						<motion.div
							key={title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
							className="flex gap-4 p-6 rounded-2xl border border-border bg-background"
						>
							<div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<Icon className="w-5 h-5 text-primary" />
							</div>
							<div>
								<h3 className="font-medium text-foreground mb-1">{title}</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>

			<Separator className="mb-16" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				className="mb-16"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-3">
					How we think about design
				</h2>
				<p className="text-muted-foreground leading-relaxed mb-4">
					The interface should feel invisible. When you're looking for a recipe,
					the last thing you should be thinking about is how the website works.
					Every interaction is designed to be predictable, every layout
					consistent, every piece of text direct and honest.
				</p>
				<p className="text-muted-foreground leading-relaxed">
					We use generous whitespace, a single accent color, and a clean
					typographic scale. Nothing competes for your attention except the
					recipes themselves.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-3">
					Ready to cook?
				</h2>
				<p className="text-muted-foreground mb-6 max-w-[400px] mx-auto">
					Share your own recipe or book a cooking lesson with one of our chefs.
				</p>
				<Button asChild size="lg">
					<Link to="/enter-the-kitchen">Enter the Kitchen</Link>
				</Button>
			</motion.div>
		</div>
	);
}
