/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";

import { Wallet } from "phosphor-react";

import { Button, Spinner } from "@/components/atoms";
import { useMutationUpdatePayment } from "@/shared/hooks/useMutation";
import { useUserPaymentData } from "@/shared/hooks/useQuery";
import { statusTypes } from "@/shared/interfaces/Common";
import { formatCurrency, formatDate } from "@/shared/utils/common";

import { Table } from "../Table";
import { ModalViewUserPaymentsProps } from "./ModalViewUserPayments.types";

export function ModalViewUserPayments({
  id,
  onClose,
}: ModalViewUserPaymentsProps) {
  const { isLoading, data: paymentRegister } = useUserPaymentData(id);
  const { isLoading: isLoadingChangeStatus, mutateAsync } =
    useMutationUpdatePayment();

  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },
      {
        Header: "Image",
        accessor: "url",
        disableSortBy: true,
        Cell: ({ cell: { value } }: any) => (
          <a
            href={`https://firebasestorage.googleapis.com/v0/b/blackinvestiments.appspot.com/o/images%2F${value}?alt=media`}
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            See complete image
          </a>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        Cell: ({ cell }: any) => (
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
              await mutateAsync({
                id: cell.row.original.id,
                status: e.target.value,
              });
            }}
          >
            {statusTypes.map((status) => (
              <option
                key={status}
                value={status.toLowerCase()}
                selected={cell.value === status.toLocaleLowerCase()}
              >
                {status}
              </option>
            ))}
          </select>
        ),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ cell: { value } }: any) => formatDate(value),
      },
      {
        Header: "Approved At",
        accessor: "approvedAt",
        Cell: ({ cell: { value } }: any) =>
          value === null ? "Not approved yet" : formatDate(value),
      },
    ],
    []
  );

  return (
    <div className="modal text-white visible opacity-100 z-50 pointer-events-auto w-full">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table data={paymentRegister?.data} columns={columns} />
          )}
          <hr />
          <div className="alert shadow-lg mt-5">
            <div>
              <Wallet size={25} />
              <span>Wallet of this user:</span>
            </div>
          </div>
        </div>
        <div className="modal-action">
          <Button
            className="btn btn-link text-red-500 w-24 mr-auto"
            type="button"
            onClick={onClose}
            disabled={isLoadingChangeStatus}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
