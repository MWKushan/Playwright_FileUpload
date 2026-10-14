const { TEST_USERNAME, TEST_PASSWORD } = process.env;

if (!TEST_USERNAME || !TEST_PASSWORD) {
  throw new Error('TEST_USERNAME and TEST_PASSWORD must be set in .env or the environment.');
}

export const loginData = {
  username: TEST_USERNAME,
  password: TEST_PASSWORD,
};
