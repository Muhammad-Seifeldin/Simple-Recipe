import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { theme } = useTheme();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
			<div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-2">
					<img
						src={
							theme === "light"
								? "/simple-recipe-logo-light.svg"
								: "/simple-recipe-logo-dark.svg"
						}
						alt="Simple Recipe"
						className="h-16 w-auto"
					/>
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					<Link
						to="/about"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						activeProps={{ className: "text-foreground" }}
					>
						About
					</Link>
					<Link
						to="/contact"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						activeProps={{ className: "text-foreground" }}
					>
						Contact
					</Link>
					<ThemeToggle />
					<Button asChild>
						<Link to="/enter-the-kitchen">Enter the Kitchen</Link>
					</Button>
				</nav>

				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setMobileOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</Button>
				</div>
			</div>

			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="md:hidden border-t border-border bg-background overflow-hidden"
					>
						<nav className="flex flex-col gap-1 px-6 py-4">
							<Link
								to="/about"
								className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
								onClick={() => setMobileOpen(false)}
							>
								About
							</Link>
							<Link
								to="/contact"
								className="text-sm font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
								onClick={() => setMobileOpen(false)}
							>
								Contact
							</Link>
							<div className="pt-2">
								<Button asChild className="w-full">
									<Link
										to="/enter-the-kitchen"
										onClick={() => setMobileOpen(false)}
									>
										Enter the Kitchen
									</Link>
								</Button>
							</div>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
