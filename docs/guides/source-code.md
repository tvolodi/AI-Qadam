# GDE-001 — Source Code Development Guide

| Field     | Value             |
|-----------|-------------------|
| ID        | GDE-001           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | development, workflow, components, api |

## Prerequisites

Before writing code, read:
- [STD-001 Tech Stack](../standards/tech-stack.md) — know the versions.
- [STD-002 Coding Style](../standards/coding-style.md) — follow conventions.
- [STD-003 Project Structure](../standards/project-structure.md) — place files correctly.

## Feature Implementation Workflow

### 1. Receive Requirement

- Read the `REQ-NNN.md` document from `docs/requirements/`.
- Identify affected pages, components, API routes, and DB models.

### 2. Database Changes (if needed)

```bash
# Edit the schema
# File: prisma/schema.prisma

# Push changes to dev DB
npm run db:push

# Regenerate Prisma client
npm run db:generate
```

- Follow Prisma naming conventions from STD-002.
- Every model needs `createdAt` / `updatedAt`.
- Multi-language fields: `fieldEn`, `fieldRu`, etc.

### 3. Create / Update Components

1. **Server Components** (default) — no `"use client"` directive, can `async/await` data.
2. **Client Components** — add `"use client"` when using hooks, event handlers, or browser APIs.
3. Use `cn()` from `@/lib/utils` for conditional classes.
4. Extract reusable parts to `src/components/ui/` or `src/components/layout/`.

### 4. Create / Update Pages

```
src/app/<route>/page.tsx    ← new page
```

- Default export an `async function` (Server Component).
- Fetch data via Prisma directly in the component (no API route needed for reads).
- For mutations, create a Server Action or API route under `src/app/api/`.

### 5. Add i18n Strings

- Add keys to **every** dictionary: `en.ts`, `ru.ts`, `uz.ts`, `ky.ts`, `tg.ts`.
- Use nested objects matching page/component structure.
- Access via the `useI18n()` hook or `I18nProvider`.

### 6. Local Verification

```bash
# Dev server
npm run dev

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build (production check)
npm run build
```

### 7. Commit

```bash
git add .
git commit -m "feat(<scope>): <short description>"
```

## API Route Pattern

```
src/app/api/<resource>/route.ts
```

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.model.findMany({ where: { visible: true } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  // validate with Zod
  const item = await prisma.model.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
```

## Common Patterns

### Glass Card Component

```tsx
import { GlassCard } from "@/components/ui/GlassCard";

<GlassCard>
  <h2>Title</h2>
  <p>Content</p>
</GlassCard>
```

### Form with Validation

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({ name: z.string().min(1), email: z.string().email() });
type FormData = z.infer<typeof schema>;

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: FormData) => { /* POST to API */ };
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```
