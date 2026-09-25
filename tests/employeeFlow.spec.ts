import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FileUploadPage } from '../pages/fileUpload';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { employeeData } from '../test-data/employeeData';
import { loginData } from '../test-data/loginData';

// These steps depend on each other (step 3 logs in with the user created in step 1),
// so run them in order on one shared page and skip the rest if a step fails
test.describe.configure({ mode: 'serial' });

let page: Page;

const firstName = faker.person.firstName();
const middleName = faker.person.firstName();
const lastName = faker.person.lastName();
// The public demo holds thousands of records, so derive the ID from the clock to avoid
// "Employee Id already exists" (OrangeHRM allows up to 10 characters)
const employeeId = Date.now().toString().slice(-8);
// Usernames must be unique and at least 5 characters; a bare first name can be too short or taken
const username = `${firstName}${employeeId}`;
const password = faker.internet.password({ length: 12, memorable: false });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('admin creates employee with login details and profile picture', async () => {
  // Login + save with login details + photo upload can take over 90s on the shared demo server
  test.setTimeout(180_000);
  const loginPage = new LoginPage(page);
  const fileUploadPage = new FileUploadPage(page);

  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await loginPage.expectDashboard();

  await fileUploadPage.gotoAddEmployee();
  await fileUploadPage.addEmployee(
    firstName,
    middleName,
    lastName,
    employeeId,
    username,
    password
  );

  await fileUploadPage.uploadProfilePicture(employeeData.profilePicture);
  // After a file is selected, OrangeHRM swaps the default avatar for a base64 preview of the image
  await expect(fileUploadPage.profilePictureIcon).toHaveAttribute('src', /^data:image/);

  await fileUploadPage.saveEmployee();
  await fileUploadPage.expectEmployeeSaved(firstName, lastName);
});

test('admin logs out', async () => {
  const logoutPage = new LogoutPage(page);

  await logoutPage.logout();
  await logoutPage.expectLogoutSuccess();
});

test('new employee can log in', async () => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
  await loginPage.expectDashboard();
});
