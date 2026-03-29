# Interrobang‽

A self-hosted CMS for publishing webcomics, built with SvelteKit.

> **Under active development** — not production-ready.

---

## Features

- **Comic reader** — page-by-page viewer with previous/next navigation via a slug-linked-list
- **Archive** — browse all pages organised by volume and chapter
- **Admin dashboard** — manage pages, chapters, volumes, and blog posts
- **Image processing** — automatic thumbnail generation on upload via Sharp
- **Markdown comments** — per-page author notes with a live markdown editor
- **Authentication** — email/password login with role-based access control

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev) + Svelte 5 |
| Database | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team) |
| Auth | [Better Auth](https://www.better-auth.com) |
| Styling | [TailwindCSS v4](https://tailwindcss.com) + [DaisyUI v5](https://daisyui.com) |
| Image processing | [Sharp](https://sharp.pixelplumbing.com) |
| Validation | [Zod](https://zod.dev) |

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for the local database)

### Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repo-url>
   cd interrobang
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Then fill in the values in `.env`:

   ```env
   DATABASE_URL="postgres://root:mysecretpassword@localhost:5432/local"
   BETTER_AUTH_SECRET=your_secret_here
   BETTER_AUTH_URL=http://localhost:5173
   ```

3. **Start the database**

   ```bash
   npm run db:start
   ```

4. **Push the schema**

   ```bash
   npm run db:push
   ```

5. **Start the dev server**

   ```bash
   npm run dev
   ```

## Database Management

```bash
npm run db:push       # Push schema changes directly (development)
npm run db:generate   # Generate a migration file
npm run db:migrate    # Run pending migrations
npm run db:studio     # Open Drizzle Studio (visual DB browser)
```

## Content Structure

```
Volume
└── Chapter
    └── Page
```

Pages are linked in reading order via a `next` slug field, forming a linked list that drives the comic reader's navigation.

## Project Structure

```
src/
├── lib/
│   ├── components/       # Shared Svelte components
│   ├── remote/           # SvelteKit remote functions (queries & form actions)
│   └── server/db/        # Drizzle schema and database client
└── routes/
    ├── (main)/           # Public site (reader, archive)
    ├── (admin)/          # Protected dashboard
    └── (api)/            # Auth API endpoints
```
