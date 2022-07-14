import { AdminUserUpdateStatusResponse } from "@/shared/interfaces/Response";

import { api } from "../api";

export async function getFinances() {
  const response = await api.get("/users/payment");

  return response.data;
}

export async function getUserList() {
  const response = await api.get("/admin/users");

  return response.data;
}

export async function getUserPayments({
  id,
}: Pick<AdminUserUpdateStatusResponse, "id">) {
  const response = await api.get(`/admin/payments/${id}`);

  return response.data;
}
