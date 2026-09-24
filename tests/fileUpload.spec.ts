import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FileUploadPage } from '../pages/fileUpload';
import { LoginPage } from '../pages/LoginPage';
import { employeeData } from '../test-data/employeeData';
import { loginData } from '../test-data/loginData';

test('user can enter employee details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const fileUploadPage = new FileUploadPage(page);

  const firstName = faker.person.firstName();
  const middleName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const employeeId = faker.string.numeric(5);

  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await loginPage.expectDashboard();
  
  await fileUploadPage.gotoAddEmployee();
  await fileUploadPage.addEmployee(
    firstName,
    middleName,
    lastName,
    employeeId,
  );

  await expect(fileUploadPage.firstNameInput).toHaveValue(firstName);
  await expect(fileUploadPage.middleNameInput).toHaveValue(middleName);
  await expect(fileUploadPage.lastNameInput).toHaveValue(lastName);
  await expect(fileUploadPage.employeeId).toHaveValue(employeeId);

  await fileUploadPage.uploadProfilePicture(employeeData.profilePicture);
  // After a file is selected, OrangeHRM swaps the default avatar for a base64 preview of the image
  await expect(fileUploadPage.profilePictureIcon).toHaveAttribute('src', /^data:image/);

  await fileUploadPage.saveEmployee();
  await fileUploadPage.expectEmployeeSaved(firstName, lastName);
});