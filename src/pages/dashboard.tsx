import { motion, Variants } from "framer-motion";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Stat } from "@/components/molecules/Stat/Stat";
import { StatContainer } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
import { useUserStatus } from "@/shared/hooks/useQuery";
import { useUser } from "@/shared/hooks/useUser";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";
import { formatCurrency } from "@/shared/utils/common";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
  const { isLoading, isFetching, data: registers } = useUserStatus();

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
              value={`${registers?.data.percentOfMonth}%`}
              color="red-700"
              isLoading={isLoading}
            />
            <Stat
              title="Your profits"
              value={formatCurrency(
                registers?.data?.totalAmountWithPercent || 0
              )}
              color="green-500"
              isLoading={isLoading}
            />
          </StatContainer>
        </div>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          <LineChart width={700} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
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
