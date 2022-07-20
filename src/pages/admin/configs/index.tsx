import { motion, Variants } from "framer-motion";

import { UpdatePercent } from "@/components/atoms";
import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
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

export default function Config() {
  return (
    <>
      <SEO title="Configs" />
      <Header id="menuDrawer" />
      <motion.section
        initial="initial"
        animate="animate"
        exit="exit"
        variants={dashboardVariants}
        className="max-w-[1100px] m-auto p-5 mt-5 relative z-10"
      >
        <h2 className="text-4xl flex items-center gap-1">
          Update project configs
        </h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto">
          <UpdatePercent />
        </div>
      </motion.section>
    </>
  );
}

export const getServerSideProps = AuthSSR(async () => {
  return {
    props: {},
  };
}, true);
