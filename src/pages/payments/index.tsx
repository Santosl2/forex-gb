import { motion, Variants } from "framer-motion";

import { Stat } from "@/components/molecules/Stat/Stat";
import { StatContainer } from "@/components/organims";
import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
import { useUser } from "@/shared/hooks/useUser";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";

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
  const { name } = useUser();

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
          <StatContainer>
            <Stat title="Your amount" value="25.6K" color="green-500" />
            <Stat title="Percent of this month" value="2.6%" color="red-700" />
            <Stat title="Your profits" value="25.6K" color="white" />
          </StatContainer>
        </div>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          fd
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
