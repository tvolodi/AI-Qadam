# GDE-003 — Tooling & DevOps Guide

| Field     | Value             |
|-----------|-------------------|
| ID        | GDE-003           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | tooling, docker, deployment, ci, scripts |

## NPM Scripts

| Script           | Command              | Purpose                         |
|------------------|----------------------|---------------------------------|
| `dev`            | `next dev`           | Start dev server (port 3000)    |
| `build`          | `next build`         | Production build                |
| `start`          | `next start`         | Start production server         |
| `lint`           | `next lint`          | Run ESLint                      |
| `db:push`        | `prisma db push`     | Push schema to DB               |
| `db:generate`    | `prisma generate`    | Regenerate Prisma client        |
| `db:studio`      | `prisma studio`      | Open Prisma Studio GUI          |
| `db:seed`        | `tsx prisma/seed.ts` | Seed database                   |

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Push schema to DB & generate client
npm run db:push
npm run db:generate

# Start dev server
npm run dev
```

## Docker

### Build Image

```bash
docker build -t ai-qadam .
```

The Dockerfile uses a 3-stage build:
1. **deps** — install production dependencies
2. **builder** — full install + `next build`
3. **runner** — slim image with standalone output

### Docker Compose

```bash
docker-compose up -d
```

Runs app + PostgreSQL. Check `docker-compose.yml` for port mappings and env vars.

## Deployment (Hetzner)

Full procedure is documented in [DEPLOYMENT.md](../../DEPLOYMENT.md).

Quick summary:
1. Build Docker image or push code to server.
2. Set up nginx/Caddy reverse proxy → port 3000.
3. Configure SSL via Cloudflare.
4. Run `docker-compose up -d`.

Deploy scripts:
- `deploy.sh` (Linux)
- `deploy.ps1` (Windows)

## Useful Commands

```bash
# Type check without emitting
npx tsc --noEmit

# Check bundle size
npx next build && ls -la .next/standalone/

# Prisma: view DB
npm run db:studio

# Kill port (if 3000 is stuck)
npx kill-port 3000
```

## CI/CD Pipeline (Future)

Planned stages:
1. **Lint** — `npm run lint`
2. **Type check** — `npx tsc --noEmit`
3. **Test** — `npm test`
4. **Build** — `npm run build`
5. **Deploy** — Push Docker image to registry, pull on server.

## Environment Variables

| Variable       | Required | Description                    |
|----------------|----------|--------------------------------|
| `DATABASE_URL` | Yes      | PostgreSQL connection string   |
| `NODE_ENV`     | No       | `development` or `production`  |

See `.env.example` for the full list.
