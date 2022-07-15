/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Spinner } from "@/components/atoms";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { usePaymentYieldData } from "@/shared/hooks/useQuery";
import { formatCurrency, formatDate } from "@/shared/utils/common";

import { Table } from "../Table";
import { ModalViewYieldsProps } from "./ModalViewYields.types";

function CustomTooltip({ payload, label, active }: any) {
  if (active) {
    return (
      <div className="bg-base-300 p-5 rounded">
        <p>{`${label}`}</p>
        <p className="text-red-200">
          Value: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-green-200">
          Percent Value: {formatCurrency(payload[0].payload.percent)}
        </p>
      </div>
    );
  }

  return null;
}

export function ModalViewYields({ id }: ModalViewYieldsProps) {
  const { isLoading, isFetching, data: yieldData } = usePaymentYieldData(id);

  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },
      {
        Header: "Profit",
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

  const formatData = () => {
    const data = yieldData?.data.map((e) => {
      return {
        name: formatDate(e.createdAt),
        percent: e.percent,
        amount: e.amount,
      };
    });

    return data;
  };

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <>
      {yieldData?.data ? (
        <div className="p-5">
          <Table data={yieldData?.data} columns={columns} />
          <hr />
          <h3 className="text-4xl my-5">Graphic</h3>
          <div className="overflow-x-auto">
            <LineChart
              width={980}
              height={400}
              data={formatData()}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line
                connectNulls
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </div>
        </div>
      ) : (
        <NoResults />
      )}
    </>
  );
}
