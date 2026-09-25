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
    readonly createLoginDetails: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;

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
        this.createLoginDetails = page.locator('.oxd-switch-input');
        this.usernameInput = page.getByRole('textbox').nth(5);
        this.passwordInput = page.locator('input[type="password"]').first();
        this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);

        // await page.getByRole('textbox').nth(4).click();
        // await page.getByRole('textbox', { name: 'First Name' }).click();
    }
    async gotoAddEmployee() {
        await this.page.goto('pim/addEmployee');
        await expect(this.AddEmloyeeLabel).toBeVisible();
        await expect(this.profilePictureIcon).toBeVisible();
    }

    async addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string, username: string, password:string) {

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.middleNameInput.fill(middleName);
    await this.employeeId.fill(employeeId);
    await this.createLoginDetails.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    }

    async uploadProfilePicture(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async saveEmployee() {
    await this.saveButton.click();

  }

    // After saving, OrangeHRM opens the Personal Details page with a "<first> <last>" heading.
    // Saving with login details makes several API calls, and the public demo can take well over
    // the default 20s expect timeout, so the save/redirect checks get a longer timeout.
    async expectEmployeeSaved(firstName: string, lastName: string) {
        await expect(this.page.getByText('Successfully Saved')).toBeVisible({ timeout: 60_000 });
        await expect(this.page).toHaveURL(/pim\/viewPersonalDetails/, { timeout: 60_000 });
        await expect(this.page.getByRole('heading', { name: `${firstName} ${lastName}` })).toBeVisible();
    }

  }
