/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-useless-fragment */

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Upload } from "phosphor-react";

import { Button, Input } from "@/components/atoms";
import { CopyButton } from "@/components/atoms/CopyButton";
import { useMutationAddMoney } from "@/shared/hooks/useMutation";
import { modalAddSchema } from "@/shared/schemas/modal";
import {
  convertFileToBase64,
  formatCurrency,
  formatCurrencyRegex,
} from "@/shared/utils/common";
import { yupResolver } from "@/shared/utils/yup";

import { ModalAddFormData } from "./ModalAdd.types";

export function ModalAdd() {
  const [mounted, setMounted] = useState(false);
  const addMoneyMutation = useMutationAddMoney();

  const { register, handleSubmit, formState, watch, setValue, reset } =
    useForm<ModalAddFormData>({
      resolver: yupResolver(modalAddSchema),
    });

  const onSubmit: SubmitHandler<ModalAddFormData> = async (data) => {
    const { amount, voucherFile } = data;

    const formatedData = {
      amount,
      voucherFile: await convertFileToBase64(voucherFile[0]),
    };

    try {
      const dataMutation = await addMoneyMutation.mutateAsync(formatedData);
      toast.success(dataMutation.message);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Internal server error");
    } finally {
      reset();
    }
  };

  const defaultCurrencyValue = () => {
    const amount = +watch("amount");

    if (isNaN(amount)) {
      return formatCurrency(0);
    }

    return formatCurrency(+amount.toString().replace("$", ""));
  };

  const flushInput = () => {
    reset();
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
      <input type="checkbox" id="modalAdd" className="modal-toggle" />

      <div className="modal text-white">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-2xl uppercase">Add money</h3>
            <p className="py-4">
              You must deposit the money in the wallet below and after that,
              send a proof so that we can approve the payment.
            </p>
            <div className="flex flex-wrap gap-1 text-sm">
              Wallet:
              <b className="text-green-700" id="wallet">
                {process.env.NEXT_PUBLIC_WALLET}
              </b>
              <CopyButton copyId="wallet" size={17} />
            </div>
            <p className="text-sm">
              Network: <b className="text-orange-200">Tron - TRC20</b>
            </p>

            <p className="py-4">
              <Input
                type="text"
                label="Deposited amount"
                id="amount"
                {...register("amount")}
                error={formState.errors.amount?.message}
                value={defaultCurrencyValue()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;

                  e.target.value = value.replace(/[^0-9]/g, "");
                  e.target.value = formatCurrencyRegex(+e.target.value);
                  setValue("amount", e.target.value);
                }}
              />

              <div className="mt-5">
                <label
                  htmlFor="uploadVoucher"
                  className="btn flex items-center gap-2 mb-5 text-sm"
                >
                  {watch("voucherFile")?.length > 0 ? (
                    watch("voucherFile")[0]?.name
                  ) : (
                    <>
                      <Upload size={20} /> Insert a payment voucher
                    </>
                  )}
                </label>
                <input
                  {...register("voucherFile")}
                  type="file"
                  id="uploadVoucher"
                  className="customInputFile"
                  accept=".png, .jpg, .jpeg"
                />
                {formState.errors.voucherFile && (
                  <p className="self-start mt-3 text-red-error">
                    {formState.errors.voucherFile.message}
                  </p>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Amount</th>
                      <th>Percent</th>
                      <th>Days to withdraw</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bronze</td>
                      <td>$500.00 - $2000.00</td>
                      <td>3% at 4%</td>
                      <td>30 days</td>
                    </tr>
                    <tr className="active">
                      <td>Silver</td>
                      <td>$2001.00 - $5000.00</td>
                      <td>4% at 5%</td>
                      <td>30 days</td>
                    </tr>
                    <tr>
                      <td>Diamond</td>
                      <td>$5001.00 - </td>
                      <td>5% at 6%</td>
                      <td>30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </p>
            <div className="modal-action">
              <label
                htmlFor="modalAdd"
                className="btn btn-link text-red-500 mr-auto"
                onClick={flushInput}
              >
                Cancel
              </label>
              <Button
                className="w-20  bg-emerald-800 text-white hover:bg-emerald-900 hover:border-emerald-900 border-emerald-800"
                isLoading={addMoneyMutation.isLoading}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>,
    // @ts-ignore
    document.querySelector("#modalPortal")
  );
}
