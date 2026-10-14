import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';

const authFile = path.join(__dirname, '../playwright/.auth/admin.json');

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await loginPage.expectDashboard();

  await page.context().storageState({ path: authFile });
});