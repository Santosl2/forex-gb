/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from "react";

import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { Cardholder } from "phosphor-react";

import { Button, Spinner } from "@/components/atoms";
import { Table } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { SEO } from "@/SEO";
import { useAdminUserList } from "@/shared/hooks/useQuery";
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

const DynamicModalPayment = dynamic<any>(() =>
  import("@/components/organims/ModalViewUserPayments").then(
    (mod) => mod.ModalViewUserPayments
  )
);

export default function PaymentVouchers() {
  const [modalPaymentOpen, setModalPaymentOpen] = useState({
    isOpen: false,
    id: null,
  });

  const { isLoading, isFetching, data: registers } = useAdminUserList();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "E-mail",
        accessor: "email",
        disableSortBy: true,
      },
      {
        Header: "Total Amount Approved",
        accessor: "totalAmountApproved",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },
      {
        Header: "Total Amount Pending",
        accessor: "totalAmountPending",
        Cell: ({ cell: { value } }: any) => formatCurrency(value),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ cell: { value } }: any) => formatDate(value),
      },
      {
        Header: "#",
        accessor: "id",
        disableSortBy: true,
        Cell: ({ cell: { value } }: any) => (
          <Button
            className="btn-ghost"
            onClick={() =>
              setModalPaymentOpen({
                isOpen: true,
                id: value,
              })
            }
          >
            <Cardholder size={24} />
          </Button>
        ),
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
          All users {isFetching && <Spinner />}
        </h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          {isLoading && !registers && <Spinner />}

          {!isLoading && registers && (
            <Table columns={columns} data={registers.data} />
          )}

          {registers?.data?.length === 0 && !isLoading && <NoResults />}
        </div>

        {modalPaymentOpen.isOpen && modalPaymentOpen.id !== null && (
          <DynamicModalPayment
            id={modalPaymentOpen.id}
            onClose={() => {
              setModalPaymentOpen({
                isOpen: false,
                id: null,
              });
            }}
          />
        )}
      </motion.section>
    </>
  );
}

export const getServerSideProps = AuthSSR(async () => {
  return {
    props: {},
  };
}, true);
