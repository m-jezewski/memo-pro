import bcrypt from 'bcryptjs';

const PEPPER = process.env.PASSWORD_PEPPER || '';
const SALT_ROUNDS = 12;

function peppered(password: string): string {
  return `${password}${PEPPER}`;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(peppered(password), SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(peppered(password), hash);
}