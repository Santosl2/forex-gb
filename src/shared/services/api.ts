import axios from "axios";
import { parseCookies } from "nookies";

import { LOGIN_COOKIE_ACCESS_TOKEN } from "../constants";

const cookies = parseCookies();
const url = process.env.NEXT_PUBLIC_SITE_URL;

export const api = axios.create({
  baseURL: url ? `${url}/api` : "/api",
});

const headerToken = cookies[LOGIN_COOKIE_ACCESS_TOKEN];

if (headerToken) {
  api.defaults.headers.common.Authorization = `Bearer ${headerToken}`;
}
