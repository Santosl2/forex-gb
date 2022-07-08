/* eslint-disable import/no-cycle */
import { UserData } from "@/shared/interfaces/User";
import { PayloadAction } from "@reduxjs/toolkit";

async function loadUserCookie(payload: UserData) {
  const { createUserCookie } = await import("@/shared/utils/auth/UserLogin");

  createUserCookie(payload);
}

export const userReducer = {
  setUser: (action: any, { payload }: PayloadAction<UserData>) => {
    if (process.browser) {
      loadUserCookie(payload);
    }

    return payload;
  },
};
