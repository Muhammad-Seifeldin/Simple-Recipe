import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks/useTheme";

function FacebookIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
			<title>Facebook</title>
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
		</svg>
	);
}

function InstagramIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Instagram</title>
			<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
		</svg>
	);
}

function PinterestIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
			<title>Pinterest</title>
			<path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
		</svg>
	);
}

function XIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
			<title>X</title>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

const socialLinks = [
	{ icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
	{ icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
	{ icon: PinterestIcon, href: "https://pinterest.com", label: "Pinterest" },
	{ icon: XIcon, href: "https://x.com", label: "X" },
];

export function Footer() {
	const { theme } = useTheme();

	return (
		<footer className="border-t border-border bg-background">
			<div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
				<Link to="/" className="flex items-center">
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

				<p className="text-sm text-muted-foreground">
					© {new Date().getFullYear()} Simple Recipe. All rights reserved.
				</p>

				<div className="flex items-center gap-4">
					{socialLinks.map(({ icon: Icon, href, label }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<Icon />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
