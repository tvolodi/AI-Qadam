---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript & React Instructions

- Use strict TypeScript. No `any` — use `unknown` with type guards.
- Use explicit return types on exported functions.
- Prefer `type` over `interface` unless declaration merging is needed.
- Import with the `@/*` alias (e.g., `import { cn } from "@/lib/utils"`).
- Default to Server Components. Add `"use client"` only for hooks/browser APIs.
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes.
- Props type defined as `type Props = { ... }` above the component.
- Add i18n strings to ALL 5 dictionaries (en, ru, uz, ky, tg) when introducing new text.
- Prisma models: PascalCase singular, `createdAt`/`updatedAt` on every model, multi-language fields use `fieldEn`/`fieldRu` suffix pattern.
