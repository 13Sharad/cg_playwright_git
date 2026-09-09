import { test as base, expect } from '@playwright/test';
import { FlightSearchPage, HotelSearchPage, LoginPage } from '../ui/page-objects';
import { saveFailureScreenshot } from '../utils/screenshot';

export type AppFixtures = {
  loginPage: LoginPage;
  hotelSearchPage: HotelSearchPage;
  flightSearchPage: FlightSearchPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  hotelSearchPage: async ({ page }, use) => use(new HotelSearchPage(page)),
  flightSearchPage: async ({ page }, use) => use(new FlightSearchPage(page)),
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await saveFailureScreenshot(page, testInfo.title);
  }
});

export { expect };
