import { HYDRATE } from "next-redux-wrapper";

import { Toast } from "@/shared/interfaces/Toast";
import { UserData } from "@/shared/interfaces/User";
import { combineReducers } from "@reduxjs/toolkit";

import ToastReducer, { SliceToastName } from "./toast";
import UserReducer, { SliceUserName } from "./user";

type Payload = {
  type: string;
  payload: {
    user: UserData;
    toast: Toast[];
  };
};

export const combinedReducers = combineReducers({
  [SliceToastName]: ToastReducer,
  [SliceUserName]: UserReducer,
});

export const masterReducer = (state: any, action: Payload) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      user: {
        ...action.payload.user,
      },
    };

    return nextState;
  }
  return combinedReducers(state, action);
};
