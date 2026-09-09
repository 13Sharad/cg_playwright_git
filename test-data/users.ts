export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  securityAnswer: string;
}

export const validRegistration: RegistrationData = {
  firstName: 'Ava',
  lastName: 'Tester',
  email: 'phptravels.valid@example.test',
  password: 'ValidPass!2026',
  confirmPassword: 'ValidPass!2026',
  securityAnswer: '14',
};

export const duplicateRegistration: RegistrationData = {
  ...validRegistration,
  email: 'phptravels.existing@example.test',
};

export const invalidRegistrations: RegistrationData[] = [
  { ...validRegistration, email: 'not-an-email' },
  { ...validRegistration, password: 'short', confirmPassword: 'short' },
  { ...validRegistration, confirmPassword: 'DifferentPass!2026' },
  { ...validRegistration, securityAnswer: 'wrong' },
];

export const emptyRegistration: RegistrationData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  securityAnswer: '',
};

export const specialCharacterRegistration: RegistrationData = {
  firstName: "O'Neil",
  lastName: 'Test-Smith',
  email: 'qa+phptravels@example.test',
  password: 'P@ssw0rd!#$2026',
  confirmPassword: 'P@ssw0rd!#$2026',
  securityAnswer: '14',
};

export const boundaryRegistration: RegistrationData = {
  firstName: 'A'.repeat(2),
  lastName: 'B'.repeat(2),
  email: 'boundary@example.test',
  password: 'Aa1!aa',
  confirmPassword: 'Aa1!aa',
  securityAnswer: '14',
};

export const longRegistration: RegistrationData = {
  firstName: 'A'.repeat(100),
  lastName: 'B'.repeat(100),
  email: `${'long'.repeat(40)}@example.test`,
  password: `Aa1!${'x'.repeat(250)}`,
  confirmPassword: `Aa1!${'x'.repeat(250)}`,
  securityAnswer: '14',
};

export interface LoginData {
  email: string;
  password: string;
}

export const validLogin: LoginData = {
  email: 'phptravels.valid@example.test',
  password: 'ValidPass!2026',
};

export const invalidLogins: LoginData[] = [
  { email: validLogin.email, password: 'WrongPass!2026' },
  { email: 'unknown@example.test', password: validLogin.password },
  { email: 'not-an-email', password: 'wrong' },
];

export const emptyLogin: LoginData = { email: '', password: '' };

export const specialCharacterLogin: LoginData = {
  email: 'qa+login@example.test',
  password: 'P@ssw0rd!#$2026',
};

export const longLogin: LoginData = {
  email: `${'user'.repeat(40)}@example.test`,
  password: `Aa1!${'x'.repeat(250)}`,
};
