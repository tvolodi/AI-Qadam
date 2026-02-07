# GDE-002 — Testing Guide

| Field     | Value             |
|-----------|-------------------|
| ID        | GDE-002           |
| Status    | Active            |
| Updated   | 2026-02-07        |
| Tags      | testing, vitest, playwright, coverage, visual |

## Testing Strategy

| Level           | Tool        | Location                        | Purpose                        |
|-----------------|-------------|----------------------------------|--------------------------------|
| Unit            | Vitest      | `__tests__/` or `*.test.ts`    | Pure functions, utils, hooks   |
| Component       | Vitest + RTL| `*.test.tsx`                    | Component render & interaction |
| Integration     | Vitest + Prisma mock | `__tests__/api/`         | API routes, DB operations      |
| End-to-End      | Playwright  | `e2e/`                          | Full user flows in browser     |
| Visual          | Playwright  | `e2e/` + `e2e/screenshots/`    | GUI element & state verification |

## File Naming & Placement

| Test type   | Convention                                         |
|-------------|-----------------------------------------------------|
| Unit test   | `src/lib/__tests__/utils.test.ts`                   |
| Component   | `src/components/ui/__tests__/Button.test.tsx`        |
| API route   | `src/app/api/<resource>/__tests__/route.test.ts`     |
| E2E         | `e2e/<feature>.spec.ts`                              |
| Visual      | `e2e/<feature>.spec.ts` (screenshots in `e2e/screenshots/`) |

## Writing Tests

### Unit Test Example

```typescript
import { cn } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });
});
```

### Component Test Example

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});
```

## Visual and GUI Testing

### Visual Verification with Playwright

Every GUI change must be verified visually using Playwright screenshots. Agents must inspect screenshots themselves — never ask the user.

```typescript
import { test, expect } from "@playwright/test";

test("visual: feature page", async ({ page }) => {
  await page.goto("/feature");
  await page.waitForLoadState("networkidle");
  
  // Full page screenshot
  await page.screenshot({ 
    path: "e2e/screenshots/feature-desktop.png", 
    fullPage: true 
  });
  
  // Mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ 
    path: "e2e/screenshots/feature-mobile.png", 
    fullPage: true 
  });
});
```

### State Change Matrix Testing

Every feature's State Change Matrix (from the REQ document) must be 100% covered by tests. Each row in the matrix becomes a test case:

```typescript
test("state: form empty → filled → loading → success", async ({ page }) => {
  await page.goto("/speak");
  
  // State: empty
  const button = page.getByRole("button", { name: /submit/i });
  await expect(button).toBeDisabled();
  await page.screenshot({ path: "e2e/screenshots/speak-empty.png" });
  
  // Transition: user types → filled
  await page.fill('[name="topic"]', "AI Ethics");
  await expect(button).toBeEnabled();
  await page.screenshot({ path: "e2e/screenshots/speak-filled.png" });
  
  // Transition: submit → loading
  await page.click('button[type="submit"]');
  await page.screenshot({ path: "e2e/screenshots/speak-loading.png" });
  
  // Transition: API success → done
  await expect(page.getByText(/success|thank/i)).toBeVisible();
  await page.screenshot({ path: "e2e/screenshots/speak-success.png" });
});
```

### GUI Element Inventory Testing

Every element in the GUI Element Inventory (from the REQ document) must be verified:

```typescript
test("gui inventory: /speak page elements", async ({ page }) => {
  await page.goto("/speak");
  
  // Verify each element exists and is visible
  await expect(page.getByRole("heading", { name: /speak/i })).toBeVisible();
  await expect(page.getByRole("textbox", { name: /topic/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
  
  // Check element states
  const submitBtn = page.getByRole("button", { name: /submit/i });
  await expect(submitBtn).toBeDisabled(); // initial state
  
  // Check hover state
  await submitBtn.hover();
  await page.screenshot({ path: "e2e/screenshots/speak-submit-hover.png" });
});
```

## Running Tests

```bash
# Unit & component tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage

# Coverage with UI viewer
npm run test:ui

# E2E tests (auto-starts dev server)
npm run test:e2e

# E2E with Playwright UI
npm run test:e2e:ui

# E2E in headed browser (visible)
npm run test:e2e:headed

# Visual regression tests
npm run test:visual
```

## Test Reports

Tester agent produces a structured report with:

1. **Validation results:** Type check, lint, build.
2. **Unit/component tests:** Suite name, pass/fail counts.
3. **E2E + visual tests:** Test name, result, screenshot paths.
4. **State Change Matrix coverage:** Every row verified.
5. **GUI Element Inventory coverage:** Every element verified.
6. **Recommendation:** Pass → Tech Writer, Fail → Issue Resolver.

## Coverage Targets

| Metric     | Target |
|------------|--------|
| Statements | ≥ 80%  |
| Branches   | ≥ 70%  |
| Functions  | ≥ 80%  |
| Lines      | ≥ 80%  |
