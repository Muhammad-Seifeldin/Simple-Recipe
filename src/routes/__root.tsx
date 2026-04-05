import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function RootLayout() {
	const router = useRouter();

	useEffect(() => {
		return router.subscribe("onLoad", () => {
			window.scrollTo({ top: 0, behavior: "instant" });
		});
	}, [router]);

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export const Route = createRootRoute({
	component: RootLayout,
});
