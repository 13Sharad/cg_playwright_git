import { test, expect } from '../fixtures/test-fixtures';
import { validOneWayFlight, invalidFlightSearches } from '../../test-data';

test.describe('Flight Search', () => {
  test('loads the flight search experience', async ({ flightSearchPage, page }) => {
    await flightSearchPage.goto();
    await expect(page.getByRole('tab', { name: /Flights/i })).toBeVisible();
  });

  test('submits a valid one-way flight search', async ({ flightSearchPage, page }) => {
    await flightSearchPage.goto();
    await flightSearchPage.search(validOneWayFlight);
    await expect(page).not.toHaveURL(/about:blank/);
  });

  test('handles invalid flight criteria', async ({ flightSearchPage, page }) => {
    await flightSearchPage.goto();
    await flightSearchPage.search(invalidFlightSearches[2]);
    await expect(page.getByText(/required|invalid|origin|destination/i).first()).toBeVisible();
  });
});
