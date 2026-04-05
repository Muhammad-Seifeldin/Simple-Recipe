import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { routeTree } from "./routeTree.gen";
import "@fontsource-variable/inter";
import "./index.css";
import { ThemeProvider } from "@/context/ThemeContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10,
			gcTime: 1000 * 60 * 20,
			retry: 2,
		},
	},
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router} />
				{import.meta.env.DEV && (
					<>
						<ReactQueryDevtools initialIsOpen={false} />
						<TanStackRouterDevtools router={router} />
					</>
				)}
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
);
