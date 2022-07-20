import { useMutation } from "react-query";

import { ModalUpdateUserWalletFormData } from "@/components/organims/ModalUpdateUserWallet/ModalUpdateUserWallet.types";

import { SignInFormData, SignUpFormData } from "../interfaces/Forms";
import { AdminUserUpdateStatusResponse } from "../interfaces/Response";
import { queryClient } from "../services/queryClient";
import {
  sendIncome,
  updatePercent,
  updateUserPaymentData,
} from "../services/requests/admin";
import { addMoney, addWallet } from "../services/requests/money";
import {
  createUser,
  loginUser,
  requestWithdraw,
} from "../services/requests/user";

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

export function useMutationUpdateUserWallet() {
  return useMutation(async (data: ModalUpdateUserWalletFormData) =>
    addWallet(data)
  );
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

export function useMutationSendIncomes() {
  return useMutation(async () => sendIncome(), {
    onSuccess: () => {
      queryClient.invalidateQueries("adminPaymentData");
      queryClient.invalidateQueries("adminUserList");
    },
  });
}

export function useRequestWithdraw() {
  return useMutation(async (id: string) => requestWithdraw(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("userFinances");
    },
  });
}
