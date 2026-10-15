import { expect, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async verifyNavigation(expectedURL: string | RegExp, options?: { timeout?: number }) {
    await expect(this.page).toHaveURL(expectedURL, options);
  }
}
