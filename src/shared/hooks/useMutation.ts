import { useMutation } from "react-query";

import { SignInFormData, SignUpFormData } from "../interfaces/Forms";
import { updatePercent } from "../services/auth/admin,";
import { addMoney } from "../services/auth/money";
import { createUser, loginUser } from "../services/auth/user";
import { queryClient } from "../services/queryClient";

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
