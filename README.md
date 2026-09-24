# OrangeHRM File Upload Automation

Playwright end-to-end tests for adding employees and uploading profile pictures in OrangeHRM.

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

## Notes

- The script creates employee usernames dynamically using generated values, so it does not rely on a predefined dataset of already taken usernames.
- This helps avoid duplicate username conflicts during test execution.