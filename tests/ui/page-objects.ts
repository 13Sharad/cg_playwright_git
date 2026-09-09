import { expect, Page } from '@playwright/test';
import type { FlightSearchData, HotelSearchData, LoginData } from '../../test-data';

const baseUrl = (process.env.PHPTRAVELS_BASE_URL ?? 'https://phptravels.net').replace(/\/$/, '');

export class BasePage {
  constructor(protected readonly page: Page) {}

  async dismissDemoNotice(): Promise<void> {
    const button = this.page.getByRole('button', { name: /I Understand & Continue/i });
    if (await button.isVisible().catch(() => false)) await button.click();
  }
}

export class LoginPage extends BasePage {
  async goto(): Promise<void> { await this.page.goto(`${baseUrl}/login`); await this.dismissDemoNotice(); }

  async login(data: LoginData): Promise<void> {
    await this.page.getByLabel('Email Address').fill(data.email);
    await this.page.getByLabel('Password').fill(data.password);
    await this.page.getByRole('button', { name: /Sign In to your account/i }).click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  }
}

export class HotelSearchPage extends BasePage {
  async goto(): Promise<void> { await this.page.goto(baseUrl); await this.dismissDemoNotice(); }

  async selectStays(): Promise<void> {
    await this.page.getByRole('tab', { name: /Stays/i }).click();
  }

  async search(data: HotelSearchData): Promise<void> {
    await this.selectStays();
    const destination = this.page.getByLabel(/Destination or Hotel Name/i);
    if (await destination.isVisible().catch(() => false)) await destination.fill(data.destination);
    const searchButton = this.page.getByRole('button', { name: /Search/i });
    if (await searchButton.isVisible().catch(() => false)) await searchButton.click();
  }
}

export class FlightSearchPage extends BasePage {
  async goto(): Promise<void> { await this.page.goto(baseUrl); await this.dismissDemoNotice(); }

  async search(data: FlightSearchData): Promise<void> {
    await this.page.getByRole('tab', { name: /Flights/i }).click();
    const origin = this.page.getByLabel(/From|Origin/i).first();
    const destination = this.page.getByLabel(/To|Destination/i).first();
    if (await origin.isVisible().catch(() => false)) await origin.fill(data.origin);
    if (await destination.isVisible().catch(() => false)) await destination.fill(data.destination);
    const searchButton = this.page.getByRole('button', { name: /Search/i });
    if (await searchButton.isVisible().catch(() => false)) await searchButton.click();
  }
}
