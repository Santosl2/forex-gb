import { SignUpFormData } from "@/shared/interfaces/Forms";

import { api } from "../api";

export async function createUser(user: SignUpFormData) {
  const response = await api.post("/users/register", {
    ...user,
  });

  return response.data;
}
