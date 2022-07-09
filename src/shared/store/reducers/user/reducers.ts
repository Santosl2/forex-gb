/* eslint-disable import/no-cycle */
import { UserData } from "@/shared/interfaces/User";
import { api } from "@/shared/services/api";
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

    api.defaults.headers.common.Authorization = `Bearer ${payload.accessToken}`;

    return payload;
  },
};
