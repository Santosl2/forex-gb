import { useMutation } from "react-query";

import { SignUpFormData } from "../interfaces/Forms";
import { createUser } from "../services/auth/user";

export function useMutationRegisterUser() {
  return useMutation(async (user: SignUpFormData) => createUser(user));
}
