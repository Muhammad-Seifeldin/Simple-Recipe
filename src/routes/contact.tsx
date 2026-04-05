import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

const contactInfo = [
	{
		icon: MapPin,
		label: "Address",
		value: "14 El-Bustan Street, Downtown Cairo, Egypt",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+20 2 2391 4567",
	},
	{
		icon: Mail,
		label: "Email",
		value: "hello@simplerecipe.eg",
	},
	{
		icon: Clock,
		label: "Working Hours",
		value: "Sun – Thu, 9:00 AM – 6:00 PM",
	},
];

function ContactPage() {
	return (
		<div className="max-w-[900px] mx-auto px-6 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-12"
			>
				<h1 className="text-4xl font-semibold text-foreground mb-4">
					Get in touch
				</h1>
				<p className="text-muted-foreground text-lg leading-relaxed max-w-[600px]">
					Have a question, a suggestion, or just want to say hello? We are based
					in Cairo and always happy to hear from fellow food lovers.
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-12 mb-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="flex flex-col gap-6"
				>
					{contactInfo.map(({ icon: Icon, label, value }, i) => (
						<motion.div
							key={label}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
							className="flex items-start gap-4"
						>
							<div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<Icon className="w-5 h-5 text-primary" />
							</div>
							<div>
								<p className="text-xs text-muted-foreground mb-0.5">{label}</p>
								<p className="text-sm font-medium text-foreground">{value}</p>
							</div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="rounded-2xl overflow-hidden border border-border h-64 md:h-auto"
				>
					<iframe
						title="Simple Recipe Location"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.7809900651!2d31.2357116!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840b7e8b0e3f7%3A0x4b5a0b6e3f4e4b5a!2sDowntown%20Cairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
						width="100%"
						height="100%"
						style={{ border: 0, minHeight: "300px" }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</motion.div>
			</div>

			<Separator className="mb-16" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="mb-16"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-3">
					Frequently asked questions
				</h2>
				<div className="flex flex-col gap-6 mt-6">
					{[
						{
							q: "Can I submit my own recipe?",
							a: "Absolutely. We welcome submissions from home cooks and professional chefs alike. Use the form in Enter the Kitchen to send us your recipe for review.",
						},
						{
							q: "Do you offer cooking lessons?",
							a: "Yes. We connect you with experienced chefs in Cairo for one-on-one or group cooking lessons. Fill out the lessons request form and we will get back to you within 48 hours.",
						},
						{
							q: "Is Simple Recipe free to use?",
							a: "Yes, browsing and using all recipes on the platform is completely free with no account required.",
						},
						{
							q: "How long does it take to hear back?",
							a: "We typically respond to all inquiries within 1–2 business days, Sunday through Thursday.",
						},
					].map(({ q, a }, i) => (
						<motion.div
							key={q}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
							className="p-6 rounded-2xl border border-border bg-muted/20"
						>
							<h3 className="font-medium text-foreground mb-2">{q}</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{a}
							</p>
						</motion.div>
					))}
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.6 }}
				className="rounded-2xl bg-primary/5 border border-primary/20 p-10 text-center"
			>
				<h2 className="text-2xl font-semibold text-foreground mb-3">
					Ready to get started?
				</h2>
				<p className="text-muted-foreground mb-6 max-w-[400px] mx-auto">
					Submit a recipe or book a cooking lesson — we would love to hear from
					you.
				</p>
				<Button asChild size="lg">
					<Link to="/enter-the-kitchen">Enter the Kitchen</Link>
				</Button>
			</motion.div>
		</div>
	);
}
