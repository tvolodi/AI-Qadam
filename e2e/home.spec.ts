import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('loads and displays main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AI-Qadam|AI Qadam/i);
    await page.screenshot({ path: 'e2e/screenshots/home-page.png', fullPage: true });
  });

  test('navbar is visible and has navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await page.screenshot({ path: 'e2e/screenshots/navbar.png' });
  });

  test('page renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
