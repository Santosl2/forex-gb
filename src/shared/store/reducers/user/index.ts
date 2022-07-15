/* eslint-disable import/no-cycle */
import { UserData } from "@/shared/interfaces/User";
import { createSlice } from "@reduxjs/toolkit";

import { userReducer } from "./reducers";

const initialState = {} as UserData;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: userReducer,
});

export const SliceUserName = UserSlice.name;
export const { setUser, logout } = UserSlice.actions;

export default UserSlice.reducer;
