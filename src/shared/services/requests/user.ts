import { SignInFormData, SignUpFormData } from "@/shared/interfaces/Forms";

import { api } from "../api";

export async function createUser(user: SignUpFormData) {
  const response = await api.post("/users/register", {
    ...user,
  });

  return response.data;
}

export async function loginUser(user: SignInFormData) {
  const response = await api.post("/users/login", {
    ...user,
  });

  return response.data;
}

export async function getStatus() {
  const response = await api.get("/users/status");

  return response.data;
}

export async function getStatistics() {
  const response = await api.get("/users/status/statistics");

  return response.data;
}

export async function getWallet() {
  const response = await api.get("/users/wallet");

  return response.data;
}

export async function requestWithdraw(id: string) {
  const response = await api.post(`/users/withdraw/${id}`);

  return response.data;
}
