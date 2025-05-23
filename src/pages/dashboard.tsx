/* eslint-disable no-prototype-builtins */
import { useEffect, useMemo, useState } from "react";

import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";

import { LineChart } from "@/components/atoms/";
import { Stat } from "@/components/molecules/Stat/Stat";
import { StatContainer } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { ModalAlertUserProps } from "@/components/organims/ModalAlertUser/ModalAlertUser.types";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { SEO } from "@/SEO";
import { useUserStatistics, useUserStatus } from "@/shared/hooks/useQuery";
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

const DynamicModalAlert = dynamic<ModalAlertUserProps>(() =>
  import("@/components/organims/ModalAlertUser").then(
    (mod) => mod.ModalAlertUser
  )
);

export default function Dashboard() {
  const [userModalYield, setUserModalYield] = useState(true);
  const { isLoading, data: registers } = useUserStatus();
  const { data: statistics, isLoading: isLoadingStatistics } =
    useUserStatistics();

  useEffect(() => {
    if (registers?.data.hasOwnProperty("canYield")) {
      setUserModalYield(registers?.data.canYield);
    }
  }, [registers]);

  const formatData = useMemo(() => {
    if (!statistics?.data) return [];

    const data = statistics?.data.map((e) => {
      return {
        name: formatDate(e.createdAt),
        amount: e.percent,
      };
    });

    return data;
  }, [statistics]);

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
        <div className="alert shadow-lg w-full mb-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Alert!</h3>
              <div className="text-xs">
                Payments are made only on the 31st! And the income only starts
                counting after one day of approval.
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex sm:block w-full mt-5 overflow-y-auto items-center justify-center flex-col">
          <StatContainer>
            <Stat
              title="Your amount"
              value={formatCurrency(
                registers?.data?.totalAmountWithoutPercent || 0
              )}
              color="orange-200"
              isLoading={isLoading}
            />
            <Stat
              title="Actual percent"
              value={`+${registers?.data.percentOfMonth}%`}
              color="red-200"
              isLoading={isLoading}
            />

            <Stat
              title="Your profits"
              value={formatCurrency(registers?.data?.totalAmountPercent || 0)}
              description={`Total: ${formatCurrency(
                registers?.data?.totalAmountWithPercent || 0
              )}`}
              color="green-200"
              isLoading={isLoading}
            />
          </StatContainer>
        </div>

        <div className="md:flex sm:block gap-5 w-full mt-5 overflow-y-auto items-center justify-center flex-col">
          {isLoadingStatistics && <p>Loading...</p>}
          {statistics?.data && statistics.data.length > 0 && (
            <LineChart data={formatData} />
          )}
          {!isLoadingStatistics && statistics?.data.length === 0 && (
            <NoResults />
          )}
        </div>
      </motion.section>

      {!userModalYield && statistics && statistics.data?.length > 0 && (
        <DynamicModalAlert onClose={() => setUserModalYield(true)} />
      )}
    </>
  );
}

export const getServerSideProps = AuthSSR(async () => {
  return {
    props: {},
  };
});
