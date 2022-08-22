/* eslint-disable react/no-unstable-nested-components */
import { useMemo, useState } from "react";

import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { Cardholder } from "phosphor-react";

import {
  BackgroundHeader,
  Button,
  Container,
  Spinner,
} from "@/components/atoms";
import { Table } from "@/components/organims";
import { ModalViewUserPaymentsProps } from "@/components/organims/ModalViewUserPayments/ModalViewUserPayments.types";
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

const DynamicModalPayment = dynamic<ModalViewUserPaymentsProps>(() =>
  import("@/components/organims/ModalViewUserPayments").then(
    (mod) => mod.ModalViewUserPayments
  )
);

export default function PaymentVouchers() {
  const [modal, setModalOpen] = useState({
    isOpen: false,
    id: null,
  });

  const { isLoading, isFetching, data: registers } = useAdminUserList();

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        disableSortBy: true,
        Cell: ({ cell: { value } }: any) => (
          <Button
            className="btn-ghost w-14"
            onClick={() =>
              setModalOpen({
                isOpen: true,
                id: value,
              })
            }
          >
            <Cardholder size={24} />
          </Button>
        ),
      },
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
    ],
    []
  );

  return (
    <>
      <SEO title="Users management" />
      <Container>
        <BackgroundHeader bgColor="rgb(12, 88, 124)" />

        <motion.section
          initial="initial"
          animate="animate"
          exit="exit"
          variants={dashboardVariants}
          className="md:ml-5 mt-5 w-full p-5 z-10"
        >
          <h2 className="text-4xl flex gap-2 items-center text-white">
            All users {isFetching && <Spinner />}
          </h2>

          <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
            {isLoading && !registers && <Spinner />}

            {!isLoading && registers && (
              <Table columns={columns} data={registers.data} />
            )}

            {registers?.data?.length === 0 && !isLoading && <NoResults />}
          </div>

          {modal.isOpen && modal.id !== null && (
            <DynamicModalPayment
              id={modal.id}
              onClose={() => {
                setModalOpen({
                  isOpen: false,
                  id: null,
                });
              }}
            />
          )}
        </motion.section>
      </Container>
    </>
  );
}

export const getServerSideProps = AuthSSR(async () => {
  return {
    props: {},
  };
}, true);
