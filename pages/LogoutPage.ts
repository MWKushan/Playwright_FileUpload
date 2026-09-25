import { expect, Locator, Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly logoutArrow: Locator;
  readonly logoutButton: Locator;
  readonly loginPageOrangeHRM: Locator;
  readonly AdminPWPannel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutArrow = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    this.loginPageOrangeHRM = page.getByRole('img', { name: 'orangehrm-logo' });
    this.AdminPWPannel = page.getByText('Username : AdminPassword :');
  }

  async logout() {
    await this.logoutArrow.click();
    await this.logoutButton.click();
  }

  async expectLogoutSuccess() {
    await expect(this.page).toHaveURL(/auth\/login/);
    await expect(this.loginPageOrangeHRM).toBeVisible();
    await expect(this.AdminPWPannel).toBeVisible();
  }
 
}

