import { hash, compare } from "bcryptjs";

export function hashPassword(password: string) {
  return hash(password, 8);
}
export function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}
