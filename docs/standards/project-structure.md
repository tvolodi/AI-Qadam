# STD-003 — Project Structure

| Field     | Value             |
|-----------|-------------------|
| ID        | STD-003           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | architecture, folders, layout |

## Top-Level Layout

```
AI-Qadam/
├── docs/                    ← Knowledge base (this KB)
│   ├── registry.yaml        ← Master document index
│   ├── standards/           ← STD-NNN documents
│   ├── guides/              ← GDE-NNN documents
│   ├── issues/              ← ISS-NNN documents + registry.yaml
│   ├── requirements/        ← REQ-NNN documents
│   └── templates/           ← Document templates for agents
├── prisma/
│   └── schema.prisma        ← Database schema
├── public/                  ← Static assets
├── src/
│   ├── app/                 ← Next.js App Router
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── providers.tsx
│   │   └── <route>/page.tsx
│   ├── components/
│   │   ├── layout/          ← Shell: Navbar, Footer, AnimatedBackground
│   │   └── ui/              ← Primitives: Button, GlassCard, Section, FormElements
│   └── lib/
│       ├── utils.ts
│       ├── i18n/            ← Config, provider, dictionaries
│       └── themes/          ← Theme definitions, ThemeProvider
├── Dockerfile               ← Multi-stage Docker build
├── docker-compose.yml       ← Compose config (app + db)
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Module Boundaries

| Module        | Responsibility                        | May import from              |
|---------------|---------------------------------------|------------------------------|
| `app/`        | Page routing, layouts                 | `components/`, `lib/`        |
| `components/` | Reusable UI                           | `lib/`                       |
| `lib/`        | Utilities, i18n, themes               | External packages only       |
| `prisma/`     | DB schema, migrations, seeds          | —                            |
| `docs/`       | Knowledge base (not imported in code) | —                            |

## Adding a New Page

1. Create `src/app/<route>/page.tsx`.
2. Import shared components from `@/components/`.
3. Add route-specific components in the same folder if they are not reusable.
4. Add i18n strings to all dictionaries in `src/lib/i18n/dictionaries/`.
5. Update `Navbar.tsx` if the page needs a nav link.

## Adding a New Shared Component

1. Create file in `src/components/ui/` (primitive) or `src/components/layout/` (shell).
2. Use PascalCase filename matching the component name.
3. Export as default or named — be consistent within the folder.
4. Add `"use client"` only if the component uses hooks or browser APIs.
