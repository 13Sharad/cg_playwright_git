import { test, expect } from '../fixtures/test-fixtures';
import { invalidLogins, validLogin } from '../../test-data';

test.describe('Login', () => {
  test('shows the login form', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectLoaded();
  });

  test('rejects invalid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(invalidLogins[0]);
    await expect(page.getByText(/invalid|incorrect|failed|error/i).first()).toBeVisible();
  });

  test('accepts valid credentials from environment', async ({ loginPage, page }) => {
    const env = (globalThis as {
      process?: { env?: Record<string, string | undefined> };
    }).process?.env;
    const email = env?.PHPTRAVELS_TEST_EMAIL;
    const password = env?.PHPTRAVELS_TEST_PASSWORD;
    test.skip(!email || !password, 'Set PHPTRAVELS_TEST_EMAIL and PHPTRAVELS_TEST_PASSWORD.');
    await loginPage.goto();
    await loginPage.login({ email: email!, password: password! });
    await expect(page).not.toHaveURL(/\/login$/);
  });
});
