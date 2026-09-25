import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FileUploadPage } from '../pages/fileUpload';
import { LoginPage } from '../pages/LoginPage';
import { employeeData } from '../test-data/employeeData';
import { loginData } from '../test-data/loginData';

test('user can enter employee details', async ({ page }) => {
  // Login + save with login details + photo upload can take over 90s on the shared demo server
  test.setTimeout(180_000);
  const loginPage = new LoginPage(page);
  const fileUploadPage = new FileUploadPage(page);

  const firstName = faker.person.firstName();
  const middleName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // The public demo holds thousands of records, so derive the ID from the clock to avoid
  // "Employee Id already exists" (OrangeHRM allows up to 10 characters)
  const employeeId = Date.now().toString().slice(-8);
  // Usernames must be unique and at least 5 characters; a bare first name can be too short or taken
  const username = `${firstName}${employeeId}`;
  const password = faker.internet.password({ length: 12, memorable: false });

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

  await expect(fileUploadPage.firstNameInput).toHaveValue(firstName);
  await expect(fileUploadPage.middleNameInput).toHaveValue(middleName);
  await expect(fileUploadPage.lastNameInput).toHaveValue(lastName);
  await expect(fileUploadPage.employeeId).toHaveValue(employeeId);
  await expect(fileUploadPage.usernameInput).toHaveValue(username);
  await expect(fileUploadPage.passwordInput).toHaveValue(password);
  await expect(fileUploadPage.confirmPasswordInput).toHaveValue(password);

  await fileUploadPage.uploadProfilePicture(employeeData.profilePicture);
  // After a file is selected, OrangeHRM swaps the default avatar for a base64 preview of the image
  await expect(fileUploadPage.profilePictureIcon).toHaveAttribute('src', /^data:image/);

  await fileUploadPage.saveEmployee();
  await fileUploadPage.expectEmployeeSaved(firstName, lastName);
});