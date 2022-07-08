import { Variants } from "framer-motion";

import { Header } from "@/components/organims/Header";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";

const loginVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function Dashboard() {
  return <Header />;
}

export const getServerSideProps = AuthSSR(async (ctx) => {
  return {
    props: {},
  };
});
