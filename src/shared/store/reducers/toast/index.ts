import { Toast } from "@/shared/interfaces/Toast";
import { createSlice } from "@reduxjs/toolkit";

import { toastReducer } from "./reducers";

const initialState = [] as Toast[];

const ToastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: toastReducer,
});

export const SliceToastName = ToastSlice.name;
export const { addToast, removeToast } = ToastSlice.actions;

export default ToastSlice.reducer;
