import { destroyCookie, setCookie } from "nookies";

import { NextCTX } from "../interfaces/Common";

export function cookieInsert(
  name: string,
  value: string,
  ctx: NextCTX | null = null
) {
  setCookie(ctx, name, value, {
    maxAge: 3600, // 1h,
    path: "/",
  });
}

export function cookieDestroy(name: string, ctx: NextCTX | null = null) {
  destroyCookie(ctx, name);
}
