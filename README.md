# OrangeHRM File Upload Automation

Playwright UI and API automation tests for OrangeHRM, including employee creation, profile-picture upload, generated-user login/logout validation, and API response validation. The employee flow runs in order and verifies that the newly created user can log in with the generated credentials.

## Technologies

- Playwright
- TypeScript
- Faker.js
- OrangeHRM

## Installation

````powershell
npm install
npx playwright install
````

## Run only the file upload spec

```powershell
npx playwright test tests/fileUpload.spec.ts
```

## Run the employee flow

The employee flow runs three serial tests on one shared page:

1. The admin creates an employee with a Faker-generated username and password, then saves the employee with a profile picture.
2. The admin logs out.
3. The newly created employee logs in using the same generated username and password, and the test verifies the dashboard.

The generated credentials are kept in variables and reused for the employee login; a new password is not generated for the login step.

```powershell
npm run test:employee-flow
```

To see the browser while the test runs:

```powershell
npm run test:employee-flow -- --headed
```

## GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs automatically for pull requests and pushes to the `main` or `master` branches.

It installs Chromium and runs only `tests/employeeFlow.spec.ts`. The Playwright HTML report is uploaded as a workflow artifact.

## Notes

- The script creates employee usernames dynamically using generated values, so it does not rely on a predefined dataset of already taken usernames.
- This helps avoid duplicate username conflicts during test execution.

## API validation practice

This project also includes a simple Playwright API testing example using JSONPlaceholder.

```powershell
npx playwright test tests/apiValidation.spec.ts
```

