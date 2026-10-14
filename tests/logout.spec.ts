import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { loginData } from '../test-data/loginData';

// Logging out ends the session on the server, which would break other tests sharing the saved
// admin session, so log in with a fresh one instead
test.use({ storageState: { cookies: [], origins: [] } });

test('user can logout from OrangeHRM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const logoutpage = new LogoutPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await loginPage.expectDashboard();

  await logoutpage.logout();
  await logoutpage.expectLogoutSuccess();
});