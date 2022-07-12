import { api } from "../api";

export async function getFinances() {
  const response = await api.get("/users/payment");

  return response.data;
}
