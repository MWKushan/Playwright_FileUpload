export const employeeData = {
  firstName: 'John',
  middleName: 'Michael',
  lastName: 'Doe',
  // Employee IDs must be unique in OrangeHRM, so generate a new one per run (max 10 chars)
  employeeId: Date.now().toString().slice(-8),
  // Relative paths are resolved from the project root (where you run `npx playwright test`)
  profilePicture: 'test-data/files/profile.png',
};
