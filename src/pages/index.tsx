import { motion, Variants } from "framer-motion";

import { Logo } from "@/components/atoms";
import { LoginForm } from "@/components/templates";
import { SEO } from "@/SEO";
import { GuestSSR } from "@/shared/utils/auth/GuestSSR";

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

export default function Home() {
  return (
    <>
      <SEO title="Login" />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={loginVariants}
        className="flex flex-col items-center justify-center h-full"
      >
        <Logo />

        <LoginForm />
      </motion.div>
    </>
  );
}

export const getServerSideProps = GuestSSR(async (ctx) => {
  return {
    props: {},
  };
});
