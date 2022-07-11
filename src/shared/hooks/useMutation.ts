import { useMutation } from "react-query";

import { SignInFormData, SignUpFormData } from "../interfaces/Forms";
import { addMoney } from "../services/auth/money";
import { createUser, loginUser } from "../services/auth/user";

export function useMutationRegisterUser() {
  return useMutation(async (user: SignUpFormData) => createUser(user));
}

export function useMutationLoginUser() {
  return useMutation(async (user: SignInFormData) => loginUser(user));
}

export function useMutationAddMoney() {
  return useMutation(async (data: any) => addMoney(data));
}
