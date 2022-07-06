import { Toast } from "@/shared/interfaces/Toast";
import { PayloadAction } from "@reduxjs/toolkit";

export const toastReducer = {
  addToast: (state: any, { payload }: PayloadAction<Toast>) => {
    return [
      ...state,
      {
        ...payload,
      },
    ];
  },
  removeToast: (state: any, { payload }: PayloadAction<Pick<Toast, "id">>) => {
    return state.filter((toast: Toast) => toast.id !== payload.id);
  },
};
