import { useMutation } from "react-query";

import { SignInFormData, SignUpFormData } from "../interfaces/Forms";
import { AdminUserUpdateStatusResponse } from "../interfaces/Response";
import { queryClient } from "../services/queryClient";
import {
  updatePercent,
  updateUserPaymentData,
} from "../services/requests/admin";
import { addMoney } from "../services/requests/money";
import { createUser, loginUser } from "../services/requests/user";

export function useMutationRegisterUser() {
  return useMutation(async (user: SignUpFormData) => createUser(user));
}

export function useMutationLoginUser() {
  return useMutation(async (user: SignInFormData) => loginUser(user));
}

export function useMutationAddMoney() {
  return useMutation(async (data: any) => addMoney(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("userFinances");
    },
  });
}

export function useMutationUpdatePercent() {
  return useMutation(async (data: number) => updatePercent(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("adminPercent");
    },
  });
}

export function useMutationUpdatePayment() {
  return useMutation(
    async (data: AdminUserUpdateStatusResponse) => updateUserPaymentData(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("adminPaymentData");
        queryClient.invalidateQueries("adminUserList");
      },
    }
  );
}
