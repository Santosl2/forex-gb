import { useCallback, useState } from "react";

import dynamic from "next/dynamic";
import { Wallet as WalletIcon } from "phosphor-react";

import { Button } from "@/components/atoms";
import { useUser } from "@/shared/hooks/useUser";

import { ModalUpdateUserWalletProps } from "../../ModalUpdateUserWallet/ModalUpdateUserWallet.types";

const DynamicUpdateWallet = dynamic<ModalUpdateUserWalletProps>(() =>
  import("../../ModalUpdateUserWallet").then((mod) => mod.ModalUpdateUserWallet)
);

export function Wallet() {
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const { walletId } = useUser();

  const updateModalWallet = useCallback(() => {
    setWalletModalIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="indicator">
        <Button
          className="btn relative whitespace-nowrap ml-5 flex flex-row gap-2 items-center justify-center modal-button w-13"
          onClick={updateModalWallet}
        >
          <WalletIcon size={20} />{" "}
          {!walletId && (
            <span className="flex h-3 w-3 absolute right-0 top-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 right-0" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
          )}
        </Button>
      </div>

      {walletModalIsOpen && <DynamicUpdateWallet onClose={updateModalWallet} />}
    </>
  );
}
