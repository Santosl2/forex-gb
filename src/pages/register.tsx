import { motion, Variants } from "framer-motion";

import { RegisterForm } from "@/components/templates";
import { GuestSSR } from "@/shared/utils/auth/GuestSSR";

const registerVariants: Variants = {
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
    x: -100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Register() {
  return (
    <div className="w-screen h-screen">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={registerVariants}
        className="flex flex-col items-center justify-center h-full"
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
}

export const getServerSideProps = GuestSSR(async (ctx) => {
  return {
    props: {},
  };
});
