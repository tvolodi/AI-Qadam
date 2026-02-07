# STD-002 — Coding Style

| Field     | Value             |
|-----------|-------------------|
| ID        | STD-002           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | conventions, typescript, react, naming |

## File Naming

| Kind               | Convention          | Example                       |
|--------------------|---------------------|-------------------------------|
| React component    | PascalCase          | `GlassCard.tsx`               |
| Page route         | `page.tsx`          | `src/app/events/page.tsx`     |
| Layout             | `layout.tsx`        | `src/app/layout.tsx`          |
| Utility module     | camelCase           | `utils.ts`                    |
| Config file        | camelCase / kebab   | `next.config.ts`, `postcss.config.mjs` |
| Dictionary file    | locale code         | `en.ts`, `ru.ts`              |
| Prisma schema      | `schema.prisma`     | `prisma/schema.prisma`        |

## Directory Organisation

```
src/
  app/              ← Next.js App Router pages
    globals.css     ← Global styles
    layout.tsx      ← Root layout
    providers.tsx   ← Client providers (theme, i18n)
    <route>/
      page.tsx
  components/
    layout/         ← Shell components (Navbar, Footer, etc.)
    ui/             ← Reusable UI primitives (Button, Card, etc.)
  lib/
    utils.ts        ← General helpers (cn, etc.)
    i18n/           ← Internationalisation config & dictionaries
    themes/         ← Theme definitions & provider
```

## TypeScript

- Strict mode enabled (`"strict": true`).
- Use explicit return types on exported functions.
- Prefer `type` over `interface` unless declaration merging is needed.
- Import paths use the `@/*` alias (e.g., `import { cn } from "@/lib/utils"`).
- No `any` — use `unknown` + type guards.

## React / Next.js

- Default to **Server Components**. Add `"use client"` only when hooks or browser APIs are needed.
- Co-locate page-specific components inside the route folder; shared components go in `src/components/`.
- Props type is defined above the component in the same file as `type Props = { ... }`.
- Use `cn()` (from `@/lib/utils`) for conditional class merging.

## Styling

- Tailwind utility classes as the primary styling method.
- No CSS modules or styled-components.
- Global styles only in `globals.css`.
- Use CSS variables for theme tokens (colours, spacing) when needed.

## Prisma / Database

- Model names: PascalCase singular (`Event`, not `Events`).
- Enum names: PascalCase; enum values: camelCase.
- Every model has `createdAt` and `updatedAt` fields.
- Multi-language fields use suffix pattern: `titleEn`, `titleRu`, etc.

## i18n

- All user-facing strings live in dictionary files under `src/lib/i18n/dictionaries/`.
- Each dictionary exports a default object with nested keys.
- Always add strings for **all** supported locales when introducing new text.

## Commits & Branches

- Commit messages: `type(scope): description` (e.g., `feat(events): add registration form`).
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- One logical change per commit.
