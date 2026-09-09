declare const process: {
  env: Record<string, string | undefined>;
};

export const environment = {
  baseUrl: (process.env.PHPTRAVELS_BASE_URL ?? 'https://phptravels.net').replace(/\/$/, ''),
  testEmail: process.env.PHPTRAVELS_TEST_EMAIL,
  testPassword: process.env.PHPTRAVELS_TEST_PASSWORD,
};
