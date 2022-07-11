import { ListItemProps } from "@/components/atoms/ListItem/ListItem.type";

export const CAPTCHA_CLIENT_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY;

export const LOGIN_COOKIE_NAME = "@black-capital/user";
export const LOGIN_COOKIE_REFRESH_TOKEN = "@black-capital/refresh-token";
export const LOGIN_COOKIE_ACCESS_TOKEN = "@black-capital/access-token";

export const ALLOWED_UPLOAD_TYPES = ["image/jpeg", "image/png"];
export const MAX_ALLOWED_FILE_SIZE = 2 * 1024 * 1024; // 2 mb

export const HEADER_USER_ITEMS: ListItemProps[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: "dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    name: "My payments",
    icon: "payment",
    href: "/payments",
  },
];

export const HEADER_ADMIN_ITEMS: ListItemProps[] = [
  ...HEADER_USER_ITEMS,
  {
    id: 3,
    name: "Users",
    icon: "users",
    href: "/users",
  },
];
