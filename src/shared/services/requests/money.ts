import { ModalUpdateUserWalletFormData } from "@/components/organims/ModalUpdateUserWallet/ModalUpdateUserWallet.types";

import { api } from "../api";

export async function addMoney(data: any) {
  const response = await api.post("/users/payment", {
    ...data,
  });

  return response.data;
}

export async function addWallet(data: ModalUpdateUserWalletFormData) {
  const response = await api.post("/users/wallet", data);

  return response.data;
}
