import { configureStore } from "@reduxjs/toolkit";

import { combinedReducers } from "./reducers";

export const store = configureStore({
  reducer: combinedReducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
