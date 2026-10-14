import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';

// This test exercises the login form itself, so start without the saved admin session
test.use({ storageState: { cookies: [], origins: [] } });

test('user can log in to OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await loginPage.expectDashboard();
});