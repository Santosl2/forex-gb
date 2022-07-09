/* eslint-disable import/no-cycle */

import {
  LOGIN_COOKIE_ACCESS_TOKEN,
  LOGIN_COOKIE_NAME,
  LOGIN_COOKIE_REFRESH_TOKEN,
} from "@/shared/constants";
import { NextCTX } from "@/shared/interfaces/Common";
import { UserData } from "@/shared/interfaces/User";
import { setUser } from "@/shared/store/reducers/user";

import { cookieDestroy, cookieInsert } from "../Cookie";

export function createUserCookie(
  payload: UserData,
  ctx: NextCTX | null = null
) {
  cookieInsert(
    LOGIN_COOKIE_NAME,
    JSON.stringify({
      id: payload.id,
      email: payload.email,
      name: payload.name,
    }),
    ctx
  );

  cookieInsert(LOGIN_COOKIE_ACCESS_TOKEN, payload.accessToken, ctx);
  cookieInsert(LOGIN_COOKIE_REFRESH_TOKEN, payload.refreshToken, ctx);

  return true;
}

export function getUserData(
  { email, name, id, refreshToken, accessToken }: UserData,
  store: any,
  ctx: NextCTX | null = null
) {
  if (email) {
    const payload = {
      id,
      email,
      name,
      refreshToken,
      accessToken,
    };

    store.dispatch(setUser(payload));

    createUserCookie(payload, ctx);
  }
}

export function logoutUser(ctx: NextCTX | null = null) {
  cookieDestroy(LOGIN_COOKIE_NAME, ctx);
  cookieDestroy(LOGIN_COOKIE_ACCESS_TOKEN, ctx);
  cookieDestroy(LOGIN_COOKIE_REFRESH_TOKEN, ctx);
}
