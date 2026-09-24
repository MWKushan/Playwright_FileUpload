import { expect, Locator, Page } from '@playwright/test';

export class FileUploadPage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly AddEmloyeeLabel: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly employeeId: Locator;
    readonly profilePictureIcon: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('input[type="file"]');
        this.AddEmloyeeLabel = page.getByRole('heading', { name: 'Add Employee' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
        this.employeeId = page.getByRole('textbox').nth(4);
        this.profilePictureIcon = page.locator('form').getByRole('img', { name: 'profile picture' });
        this.saveButton = page.getByRole('button', { name: 'Save' });

        // await page.getByRole('textbox').nth(4).click();
        // await page.getByRole('textbox', { name: 'First Name' }).click();
    }
    async gotoAddEmployee() {
        await this.page.goto('pim/addEmployee');
        await expect(this.AddEmloyeeLabel).toBeVisible();
        await expect(this.profilePictureIcon).toBeVisible();
    }

    async addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string) {

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.middleNameInput.fill(middleName);
    await this.employeeId.fill(employeeId);
    }

    async uploadProfilePicture(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async saveEmployee() {
    await this.saveButton.click();

  }

    // After saving, OrangeHRM opens the Personal Details page with a "<first> <last>" heading
    async expectEmployeeSaved(firstName: string, lastName: string) {
        await expect(this.page).toHaveURL(/pim\/viewPersonalDetails/);
        await expect(this.page.getByRole('heading', { name: `${firstName} ${lastName}` })).toBeVisible();
    }

  }


// Codegen recording (kept for reference)
// await page.getByRole('button', { name: 'Save' }).click();
// await page.getByRole('textbox', { name: 'Username' }).click();
// await page.getByRole('textbox', { name: 'Username' }).click();
// await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
// await page.getByRole('textbox', { name: 'Username' }).press('Tab');
// await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
// await page.getByRole('button', { name: 'Login' }).click();
// await page.getByRole('textbox', { name: 'First Name' }).click();
// await page.getByRole('textbox', { name: 'First Name' }).fill('ass');
// await page.getByRole('textbox', { name: 'Middle Name' }).click();
// await page.getByRole('textbox', { name: 'Middle Name' }).fill('ddd');
// await page.getByRole('textbox', { name: 'Last Name' }).click();
// await page.getByRole('textbox', { name: 'Last Name' }).fill('ggg');
// await page.getByRole('textbox').nth(4).click();
// await page.getByRole('textbox').nth(4).click();
// await page.getByRole('button', { name: 'Save' }).click();
// await page.locator('.oxd-input-group > div:nth-child(2)').first().click();
// await page.getByRole('textbox').nth(4).fill('2345');
// await page.getByRole('button', { name: 'Save' }).click();
// await page.getByRole('heading', { name: 'ass ggg' }).click();
// await page.getByRole('heading', { name: 'ass ggg' }).click();
