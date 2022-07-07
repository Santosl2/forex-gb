import { LOGIN_COOKIE_NAME } from "@/shared/constants";
import { UserData } from "@/shared/interfaces/User";
import { cookieInsert } from "@/shared/utils/Cookie";
import { PayloadAction } from "@reduxjs/toolkit";

export const userReducer = {
  setUser: (action: any, { payload }: PayloadAction<UserData>) => {
    if (process.browser) {
      cookieInsert(
        LOGIN_COOKIE_NAME,
        JSON.stringify({
          ...payload,
        })
      );
    }

    return payload;
  },
};
