import { createWrapper } from "next-redux-wrapper";

import { configureStore } from "@reduxjs/toolkit";

import { masterReducer } from "./reducers";

export const store = configureStore({
  reducer: masterReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(() => store, { debug: false });
