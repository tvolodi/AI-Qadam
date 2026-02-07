# STD-001 — Tech Stack

| Field     | Value             |
|-----------|-------------------|
| ID        | STD-001           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | architecture, dependencies |

## Runtime & Framework

| Technology       | Version | Purpose                          |
|------------------|---------|----------------------------------|
| Node.js          | 22 LTS  | Server runtime                   |
| Next.js          | 15.x    | Fullstack React framework (App Router) |
| React            | 19.x    | UI library                       |
| TypeScript       | 5.x     | Type-safe language               |

## Styling

| Technology       | Version | Purpose                          |
|------------------|---------|----------------------------------|
| Tailwind CSS     | 4.x     | Utility-first CSS                |
| tailwind-merge   | 3.x     | Conditional class merging        |
| clsx             | 2.x     | Class string builder             |
| Framer Motion    | 12.x    | Animations                       |

## Data & Forms

| Technology       | Version | Purpose                          |
|------------------|---------|----------------------------------|
| Prisma           | 6.x     | ORM / DB client                  |
| PostgreSQL       | —       | Primary database                 |
| React Hook Form  | 7.x     | Form state management            |
| Zod              | 3.x     | Schema validation                |
| @hookform/resolvers | 3.x  | Zod ↔ RHF bridge                |

## UI Components

| Technology       | Version | Purpose                          |
|------------------|---------|----------------------------------|
| Lucide React     | 0.474+  | Icon library                     |
| next-themes      | 0.4.x   | Theme switching (dark/light)     |

## DevOps

| Technology       | Version | Purpose                          |
|------------------|---------|----------------------------------|
| Docker           | —       | Containerization (multi-stage)   |
| nginx / Caddy    | —       | Reverse proxy                    |
| ESLint           | 9.x     | Linting                         |
| PostCSS          | 8.x     | CSS processing pipeline          |

## i18n

Supported locales: `en`, `ru`, `uz`, `ky`, `tg`  
Default locale: `en`  
Strategy: Dictionary files in `src/lib/i18n/dictionaries/`, client-side `I18nProvider`.

## Database Schema (Prisma models)

| Model               | Purpose                           |
|----------------------|-----------------------------------|
| Expert               | Community members / AI experts    |
| Event                | Meetups, workshops, conferences   |
| EventRegistration    | Event sign-ups                    |
| Announcement         | News items                        |
| SpeechProposal       | Call-for-speakers submissions     |
| PartnershipRequest   | Partnership inquiries             |

## Key Decisions

- **App Router** (not Pages Router) — all routes under `src/app/`.
- **Standalone output** — `next.config.ts` sets `output: "standalone"` for Docker.
- **Path alias** — `@/*` maps to `./src/*`.
- **Strict TypeScript** — `"strict": true` in tsconfig.
