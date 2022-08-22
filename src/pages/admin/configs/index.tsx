import { motion, Variants } from "framer-motion";

import { Container, UpdatePercent } from "@/components/atoms";
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
      <Container>
        <motion.section
          initial="initial"
          animate="animate"
          exit="exit"
          variants={dashboardVariants}
          className="md:ml-5 mt-5 w-full p-5 z-10"
        >
          <h2 className="text-4xl flex items-center gap-1">
            Update project configs
          </h2>

          <div className="flex gap-5 w-full mt-5 overflow-y-auto">
            <UpdatePercent />
          </div>
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
