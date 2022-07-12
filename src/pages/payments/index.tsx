/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from "react";

import { motion, Variants } from "framer-motion";

import { Badge } from "@/components/atoms/Badge/Badge";
import { Table } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
import { useUserFinances } from "@/shared/hooks/useQuery";
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

const badgeType = {
  recused: "error",
  approved: "success",
  pending: "warning",
} as any;

export default function PaymentVouchers() {
  const { isLoading, data: registers } = useUserFinances();

  const formattedData = useMemo(() => {
    return registers?.data?.map((res: any) => {
      return {
        amount: res.amount,
        voucher: res.url,
        createdAt: res.createdAt,
        status: res.status,
      };
    });
  }, [registers]);

  const columns = useMemo(
    () => [
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },
      {
        Header: "Image",
        accessor: "voucher",
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
          <Badge type={badgeType[value]}>{value}</Badge>
        ),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ cell: { value } }: any) => formatDate(value),
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
        <h2 className="text-4xl">Your payments</h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          {!isLoading && registers && (
            <Table columns={columns} data={formattedData} />
          )}
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
