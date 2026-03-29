# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build

# Type checking
npm run check         # Run svelte-check + tsc
npm run check:watch   # Watch mode

# Code quality
npm run lint          # ESLint + Prettier check
npm run format        # Format with Prettier

# Database
npm run db:start      # Start Postgres via Docker (compose.yaml)
npm run db:push       # Push schema changes (no migration file)
npm run db:generate   # Generate migration files
npm run db:migrate    # Run pending migrations
npm run db:studio     # Open Drizzle Studio
```

There are no tests in this project.

## Architecture

### Route groups

- `(main)/` — public-facing site: home, `/archive`, `/comic/[slug]`
- `(admin)/__dashboard/` — protected CMS: pages, chapters, volumes, blog
- `(api)/api/auth/` — Better Auth endpoints

Admin routes are protected via `hooks.server.ts`, which runs the Better Auth handler and attaches the session/user to `event.locals`.

### Remote functions (`src/lib/remote/`)

This project uses SvelteKit's **experimental remote functions** (`remoteFunctions: true` in `svelte.config.js`) instead of `+page.server.ts` form actions for admin mutations.

- `query()` — server-only data fetching, called with `await` at the top level of a `<script>` in async components
- `form()` — server-side form handler; the returned object must be **spread onto the `<form>` element** (`{...action}`) and fields connected via `{...action.fields.fieldName.as('type')}`. Do not use it as a URL or call it as a function.

`comic.remote.ts` contains all comic-related queries and mutations. `user.remote.ts` has `getUser()` for the current session.

Async components are enabled (`compilerOptions.experimental.async: true`), which allows top-level `await` in component `<script>` blocks.

### Database (`src/lib/server/db/`)

Drizzle ORM with `postgres-js` driver. Schema is in `schema.ts` — edit it and run `db:push` (dev) or `db:generate` + `db:migrate` (prod).

Content hierarchy: **Volumes → Chapters → Pages** (each linked by foreign key). Pages have a `next` field (slug of the following page) forming a linked list — `addNewPage` and `editPage` both maintain this chain.

Zod insert schemas are generated from the Drizzle schema via `drizzle-zod` (`createInsertSchema`).

### Authentication

Better Auth with email/password. The admin plugin enables role-based access. Server-side: `src/lib/auth.ts`. Client-side: `src/lib/auth-client.ts`.

### Styling

TailwindCSS v4 (loaded as a Vite plugin) + DaisyUI v5. Global CSS is at `src/routes/layout.css`. DaisyUI CSS variables follow the pattern `--color-base-100`, `--color-base-content`, etc.

### File uploads

Images are written to `uploads/pages/` and thumbnails to `uploads/thumbs/` (both gitignored). The Vite dev server is configured to serve from `/uploads`. Sharp generates thumbnails at 150px width.

## Environment variables

```
DATABASE_URL=        # PostgreSQL connection string
BETTER_AUTH_SECRET=  # Auth secret
BETTER_AUTH_URL=     # Base URL (e.g. http://localhost:5173)
```
