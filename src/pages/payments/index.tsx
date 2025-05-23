/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from "react";
import { toast } from "react-toastify";

import { motion, Variants } from "framer-motion";

import { Button, Spinner } from "@/components/atoms";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Table } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { SEO } from "@/SEO";
import { useRequestWithdraw } from "@/shared/hooks/useMutation";
import { useUserFinances } from "@/shared/hooks/useQuery";
import { badgeTypes } from "@/shared/interfaces/Common";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";
import { formatCurrency, formatDate } from "@/shared/utils/common";

const dashboardVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.5,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function PaymentVouchers() {
  const { isLoading, isFetching, data: registers } = useUserFinances();
  const { isLoading: isRequestWithdraw, mutateAsync } = useRequestWithdraw();

  const requestWithdraw = async (id: string) => {
    try {
      const requestWithdrawData = await mutateAsync(id);

      if (!requestWithdrawData.success) {
        toast(requestWithdrawData.message, { type: "info" });

        return;
      }

      toast.success(requestWithdrawData.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Internal server error");
    }
  };

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
        Cell: ({ cell: { value } }: any) => (
          <Badge type={badgeTypes[value].color}>{badgeTypes[value].text}</Badge>
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
      {
        Header: "#",
        accessor: "canWithdraw",
        disableSortBy: true,
        Cell: ({ cell }: any) => {
          const { id } = cell.row.original;
          const { canWithdraw, status } = cell.row.values;

          return (
            <Button
              className="w-24"
              disabled={!canWithdraw || status === "request_withdraw"}
              isLoading={isRequestWithdraw}
              onClick={() => requestWithdraw(id)}
            >
              Withdraw
            </Button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <SEO title="Dashboard" />
      <Header id="menuDrawer" />

      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={dashboardVariants}
        className="max-w-[1100px] m-auto p-5 mt-5 relative z-10"
      >
        <h2 className="text-4xl flex gap-2 items-center">
          Your payments {isFetching && <Spinner />}
        </h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          {isLoading && !registers && <Spinner />}

          {!isLoading && registers?.data && registers.data.length > 0 && (
            <Table columns={columns} data={registers.data} />
          )}

          {registers?.data.length === 0 && !isLoading && <NoResults />}
        </div>
      </motion.section>
    </>
  );
}

export const getServerSideProps = AuthSSR(async () => {
  return {
    props: {},
  };
});
