import { test, expect } from '../fixtures/test-fixtures';
import { validHotelSearch, invalidHotelSearches } from '../../test-data';

test.describe('Hotel Search', () => {
  test('loads the hotel search experience', async ({ hotelSearchPage, page }) => {
    await hotelSearchPage.goto();
    await expect(page.getByRole('tab', { name: /Stays/i })).toBeVisible();
  });

  test('submits a valid hotel search', async ({ hotelSearchPage, page }) => {
    await hotelSearchPage.goto();
    await hotelSearchPage.search(validHotelSearch);
    await expect(page).not.toHaveURL(/about:blank/);
  });

  test('handles invalid hotel criteria', async ({ hotelSearchPage, page }) => {
    await hotelSearchPage.goto();
    await hotelSearchPage.search(invalidHotelSearches[0]);
    await expect(page.getByText(/required|invalid|destination/i).first()).toBeVisible();
  });
});
