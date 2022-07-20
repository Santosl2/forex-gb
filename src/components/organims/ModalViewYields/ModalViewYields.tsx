/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

import { LineChart, Spinner } from "@/components/atoms";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { usePaymentYieldData } from "@/shared/hooks/useQuery";
import { formatCurrency, formatDate } from "@/shared/utils/common";

import { Table } from "../Table";
import { ModalViewYieldsProps } from "./ModalViewYields.types";

export function ModalViewYields({ id }: ModalViewYieldsProps) {
  const { isLoading, isFetching, data: yieldData } = usePaymentYieldData(id);

  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "percent",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },

      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        Cell: ({ cell: { value } }: any) => value,
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ cell: { value } }: any) => formatDate(value),
      },
    ],
    []
  );

  const formatData = useMemo(() => {
    if (!yieldData?.data) return [];

    const data = yieldData?.data.map((e) => {
      return {
        name: formatDate(e.createdAt),
        amount: e.percent,
      };
    });

    return data;
  }, [yieldData]);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {yieldData?.data ? (
        <div className="p-5">
          <Table data={yieldData.data} columns={columns} />
          <hr />
          <h3 className="text-4xl my-5">Graphic</h3>
          <div className="overflow-x-auto">
            <LineChart data={formatData} />
          </div>
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
}
