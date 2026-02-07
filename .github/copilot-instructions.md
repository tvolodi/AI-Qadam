# AI-Qadam — Repository Instructions

## Project Summary

AI-Qadam is a multilingual community platform for AI enthusiasts in Central Asia. Built with Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Prisma 6, and PostgreSQL.

## Knowledge Base

The project knowledge base lives in `docs/`. The master index is `docs/registry.yaml`.
- **Always read `docs/registry.yaml` first** to find relevant documentation.
- Filter by `id`, `tags`, or `category`, then read only the target `.md` file.
- Standards: `docs/standards/` (STD-NNN) — tech stack, coding style, project structure.
- Guides: `docs/guides/` (GDE-NNN) — source code dev, testing, tooling.
- Issues: `docs/issues/` (ISS-NNN) — bug reports with `docs/issues/registry.yaml` as the issue tracker.
- Requirements: `docs/requirements/` (REQ-NNN) — feature specifications.
- Templates: `docs/templates/` — copy these when creating new documents.

## Build & Validate

Always run these commands after making changes, in this order:

```bash
npx tsc --noEmit          # Type check (must pass)
npm run lint              # ESLint (must pass)
npm run build             # Production build (must succeed)
```

## Key Commands

| Task              | Command                |
|-------------------|------------------------|
| Dev server        | `npm run dev`          |
| Build             | `npm run build`        |
| Lint              | `npm run lint`         |
| Type check        | `npx tsc --noEmit`    |
| DB push           | `npm run db:push`      |
| DB generate       | `npm run db:generate`  |
| DB studio         | `npm run db:studio`    |
| DB seed           | `tsx prisma/seed.ts`   |

## Project Layout

```
src/app/          ← Next.js App Router pages (Server Components by default)
src/components/   ← layout/ (shell) and ui/ (primitives)
src/lib/          ← utils, i18n (5 locales: en,ru,uz,ky,tg), themes
prisma/           ← schema.prisma (PostgreSQL)
docs/             ← Knowledge base (YAML registries + Markdown docs)
```

## Conventions

- Path alias: `@/*` → `./src/*`
- Strict TypeScript (`"strict": true`)
- Server Components by default; add `"use client"` only when needed
- Tailwind utility classes for styling (no CSS modules)
- Prisma models: PascalCase singular; enums: PascalCase names, camelCase values
- i18n: all user-facing strings in `src/lib/i18n/dictionaries/{en,ru,uz,ky,tg}.ts`
- Commits: `type(scope): description` (feat, fix, docs, refactor, test, chore)

## Custom Agents

This project uses specialized custom agents in `.github/agents/`. Each agent has a specific role in the development workflow. See `docs/registry.yaml` for the full documentation index that all agents reference.

Trust these instructions. Only search for additional information if something here is incomplete or found to be incorrect.
