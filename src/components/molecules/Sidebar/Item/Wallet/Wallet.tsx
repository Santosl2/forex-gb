import { useCallback, useState } from "react";

import dynamic from "next/dynamic";
import { Wallet as WalletIcon } from "phosphor-react";

import { ModalUpdateUserWalletProps } from "@/components/organims/ModalUpdateUserWallet/ModalUpdateUserWallet.types";
import { useUser } from "@/shared/hooks/useUser";

import { Item } from "../Item";
import { CustomItemProps } from "../Item.types";

const DynamicUpdateWallet = dynamic<ModalUpdateUserWalletProps>(() =>
  import("../../../../organims/ModalUpdateUserWallet").then(
    (mod) => mod.ModalUpdateUserWallet
  )
);

export function Wallet({ hiddenText, onClick }: CustomItemProps) {
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const { walletId } = useUser();

  const updateModalWallet = useCallback(() => {
    onClick?.();
    setWalletModalIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Item
        icon={<WalletIcon />}
        title="Wallet"
        showIndicator={!walletId}
        hiddenText={hiddenText}
        onClick={updateModalWallet}
      />

      {walletModalIsOpen && <DynamicUpdateWallet onClose={updateModalWallet} />}
    </>
  );
}
