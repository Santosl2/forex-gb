/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-useless-fragment */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Input } from "@/components/atoms";
import { useMutationUpdateUserWallet } from "@/shared/hooks/useMutation";
import { useUser } from "@/shared/hooks/useUser";
import { modalUpdateWalletSchema } from "@/shared/schemas/modal";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  ModalUpdateUserWalletFormData,
  ModalUpdateUserWalletProps,
} from "./ModalUpdateUserWallet.types";

export function ModalUpdateUserWallet({ onClose }: ModalUpdateUserWalletProps) {
  const [mounted, setMounted] = useState(false);
  const { isLoading, mutateAsync } = useMutationUpdateUserWallet();
  const { walletId } = useUser();

  const { handleSubmit, formState, register } =
    useForm<ModalUpdateUserWalletFormData>({
      resolver: yupResolver(modalUpdateWalletSchema),
    });

  const onSubmit: SubmitHandler<ModalUpdateUserWalletFormData> = async (
    data
  ) => {
    try {
      const dataMutation = await mutateAsync(data);
      toast.success(dataMutation.message);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Internal server error");
    }
  };

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return <></>;

  return createPortal(
    <>
      <div className="modal text-white visible opacity-100 z-50 pointer-events-auto w-full">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl uppercase">
              Add your wallet address
            </h3>
            <div className="py-4">
              <div className="mb-5">
                <Input
                  label="Wallet Address"
                  id="walletAddress"
                  {...register("walletAddress")}
                  defaultValue={walletId}
                  error={formState.errors.walletAddress?.message}
                />
              </div>
              <select className="select select-bordered w-full " disabled>
                <option disabled selected>
                  TRON (TRC20)
                </option>
              </select>

              <div className="alert alert-error shadow-lg w-full my-5">
                <div className="text-md">
                  We are not responsible for incorrectly placed data.
                </div>
              </div>
            </div>
            <div className="modal-action">
              <Button
                className="w-32  btn-link text-red-500 mr-auto"
                type="button"
                onClick={onClose}
              >
                Close
              </Button>
              <Button className="w-32" type="submit" isLoading={isLoading}>
                Finish
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    // @ts-ignore
    document.querySelector("#modalWalletPortal")
  );
}
