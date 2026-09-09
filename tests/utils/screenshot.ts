import type { Page } from '@playwright/test';

export async function saveFailureScreenshot(page: Page, testTitle: string): Promise<void> {
  const safeName = testTitle.replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
  await page.screenshot({ path: `test-results/${safeName}.png`, fullPage: true });
}
