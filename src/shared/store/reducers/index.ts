import { HYDRATE } from "next-redux-wrapper";

import { UserData } from "@/shared/interfaces/User";
import { combineReducers } from "@reduxjs/toolkit";

import UserReducer, { SliceUserName } from "./user";

type Payload = {
  type: string;
  payload: {
    user: UserData;
  };
};

export const combinedReducers = combineReducers({
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
