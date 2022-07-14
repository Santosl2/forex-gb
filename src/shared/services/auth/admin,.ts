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
