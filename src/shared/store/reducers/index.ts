import { combineReducers } from "@reduxjs/toolkit";

import ToastReducer, { SliceToastName } from "./toast";

export const combinedReducers = combineReducers({
  [SliceToastName]: ToastReducer,
});
