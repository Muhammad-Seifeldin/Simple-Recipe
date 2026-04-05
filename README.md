# Simple Recipe

A clean, minimal recipe browsing platform built with React and TypeScript. Browse 50+ curated recipes from around the world, filter by cuisine, difficulty, meal type, and rating, and explore full recipe details — all without ads or distractions.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **TanStack Router** — file-based routing with full type safety
- **TanStack Query** — server state management and caching
- **Zod** — schema validation
- **React Hook Form** — form state management
- **shadcn/ui** — component library
- **Tailwind CSS v4** — styling
- **Motion** — animations
- **Biome** — linting and formatting

## Features

- Pinterest-style recipe grid with pagination
- Filter by cuisine, difficulty, meal type, and rating
- Tag-based filtering via slide-in drawer
- Search by recipe name or tags
- Full recipe detail page with ingredients and instructions
- Submit your own recipe or request cooking lessons
- Light and dark mode
- Fully responsive

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/        # Reusable UI components
│   ├── ui/            # shadcn generated components
│   ├── layout/        # Navbar and Footer
│   ├── home/          # Recipe grid, cards, filters, pagination
│   ├── form/          # Form components and option selector
│   └── shared/        # ThemeToggle
├── routes/            # TanStack Router file-based routes
├── hooks/             # TanStack Query hooks
├── lib/               # API client, filters, utilities
├── schemas/           # Zod schemas
├── types/             # TypeScript types
└── context/           # Theme context
\`\`\`

## API

Data is sourced from [DummyJSON Recipes API](https://dummyjson.com/docs/recipes). All 50 recipes are fetched on load and filtered client-side for instant results.

## License

MIT