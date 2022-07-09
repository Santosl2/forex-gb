import { sign } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

export function jwtGenerate(payload: string, expireDate?: string): string {
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN_TOKEN } = process.env;

  const token = sign({}, JWT_SECRET_KEY as string, {
    subject: payload,
    expiresIn: expireDate || JWT_EXPIRES_IN_TOKEN,
  });

  return token;
}

export function parseJwt(token: string) {
  if (!token) {
    return null;
  }

  return jwtDecode(token);
}
