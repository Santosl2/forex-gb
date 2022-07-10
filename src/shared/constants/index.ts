export const CAPTCHA_CLIENT_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY;

export const LOGIN_COOKIE_NAME = "@black-capital/user";
export const LOGIN_COOKIE_REFRESH_TOKEN = "@black-capital/refresh-token";
export const LOGIN_COOKIE_ACCESS_TOKEN = "@black-capital/access-token";

export const ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png"];
export const MAX_ALLOWED_FILE_SIZE = 2 * 1024 * 1024; // 2 mb
