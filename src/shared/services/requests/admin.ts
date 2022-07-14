import { AdminUserUpdateStatusResponse } from "@/shared/interfaces/Response";

import { api } from "../api";

export async function getPercent() {
  const response = await api.get("/admin/configs/percent");

  return response.data;
}

export async function updatePercent(data: number) {
  const response = await api.patch("/admin/configs/percent", {
    percent: data,
  });

  return response.data;
}

export async function updateUserPaymentData({
  id,
  status,
}: AdminUserUpdateStatusResponse) {
  const response = await api.patch(`/admin/payments/${id}`, {
    status,
  });

  return response.data;
}
