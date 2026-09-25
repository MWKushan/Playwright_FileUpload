import { test } from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';

test('user can logout from OrangeHRM', async ({ page }) => {
  const logoutpage = new LogoutPage(page);

  await logoutpage.logout();
  await logoutpage.expectLogoutSuccess();
});