import { motion, Variants } from "framer-motion";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Stat } from "@/components/molecules/Stat/Stat";
import { StatContainer } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { NoResults } from "@/components/templates/NoResults/NoResults";
import { SEO } from "@/SEO";
import { useUserStatistics, useUserStatus } from "@/shared/hooks/useQuery";
import { useUser } from "@/shared/hooks/useUser";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";
import { formatCurrency, formatDate } from "@/shared/utils/common";

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

export default function Dashboard() {
  const { name } = useUser();
  const { isLoading, data: registers } = useUserStatus();
  const { data: statistics, isLoading: isLoadingStatistics } =
    useUserStatistics();

  const formatData = () => {
    const data = statistics?.data.map((e) => {
      return {
        name: formatDate(e.createdAt),
        percent: e.percent,
        amount: e.amount,
      };
    });

    return data;
  };

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
        <h2 className="text-4xl">Hello, {name}</h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center ">
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
              value={formatCurrency(
                registers?.data?.totalAmountWithPercent || 0
              )}
              color="green-200"
              isLoading={isLoading}
            />
          </StatContainer>
        </div>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          {isLoadingStatistics && <p>Loading...</p>}
          {statistics?.data && statistics.data.length > 0 && (
            <LineChart
              width={700}
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
          )}
          {!isLoadingStatistics &&
            statistics?.data &&
            statistics.data.length === 0 && <NoResults />}
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
