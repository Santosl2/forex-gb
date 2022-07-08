import { Variants } from "framer-motion";

import { AuthSSR } from "@/shared/utils/auth/AuthSSR";

const loginVariants: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Dashboard() {
  return <>f</>;
}

export const getServerSideProps = AuthSSR(async (ctx) => {
  return {
    props: {},
  };
});
