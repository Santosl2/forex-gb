/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-useless-fragment */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Upload } from "phosphor-react";

import { Button, Input } from "@/components/atoms";
import { CopyButton } from "@/components/atoms/CopyButton";
import { modalAddSchema } from "@/shared/schemas/modal";
import { yupResolver } from "@/shared/utils/yup";

import { ModalAddFormData } from "./ModalAdd.types";

export function ModalAdd() {
  const [mounted, setMounted] = useState(false);

  const { register, handleSubmit, formState, watch, reset } =
    useForm<ModalAddFormData>({
      resolver: yupResolver(modalAddSchema),
    });

  const onSubmit: SubmitHandler<ModalAddFormData> = async (data) => {
    console.log(data);
    reset();
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
            <div className="flex gap-2">
              Wallet:{" "}
              <b className="text-green-700" id="wallet">
                {process.env.NEXT_PUBLIC_WALLET}
              </b>
              <CopyButton copyId="wallet" />
            </div>
            <p>
              Network: <b className="text-orange-200">Tron - TRC20</b>
            </p>

            <p className="py-4">
              <Input
                type="text"
                label="Deposited amount"
                id="amount"
                {...register("amount")}
                error={formState.errors.amount?.message}
              />

              <div className="mt-5">
                <label
                  htmlFor="uploadVoucher"
                  className="btn flex items-center gap-2 mb-5"
                >
                  <Upload size={20} />
                  {watch("voucher")?.length > 0
                    ? watch("voucher")[0]?.name
                    : "Insert a payment voucher"}
                </label>
                <input
                  {...register("voucher")}
                  type="file"
                  id="uploadVoucher"
                  className="customInputFile"
                  accept=".png, .jpg, .jpeg"
                />
                {formState.errors.voucher && (
                  <p className="self-start mt-3 text-red-error">
                    {formState.errors.voucher.message}
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
                      <th>Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bronze</td>
                      <td>$500.00 - $2000.00</td>
                      <td>3% at 5%</td>
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
                className="btn bg-rose-800 text-white hover:bg-rose-900 hover:border-rose-900 border-rose-800 mr-auto"
                onClick={flushInput}
              >
                Cancel
              </label>
              <Button className="w-20  bg-emerald-800 text-white hover:bg-emerald-900 hover:border-emerald-900 border-emerald-800">
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
