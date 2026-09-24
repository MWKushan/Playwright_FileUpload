import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto() {
    await this.page.goto('auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardHeading).toBeVisible();
  }
}

// await page.getByRole('textbox', { name: 'Username' }).click();
// await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
// await page.getByRole('textbox', { name: 'Username' }).press('Tab');
// await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
// await page.getByRole('button', { name: 'Login' }).click();
// await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
// await page.getByRole('heading', { name: 'Dashboard' }).click();