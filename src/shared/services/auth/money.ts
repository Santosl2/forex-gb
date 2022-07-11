import { api } from "../api";

export async function addMoney(data: any) {
  const response = await api.post("/users/addMoney", {
    ...data,
  });

  return response.data;
}
