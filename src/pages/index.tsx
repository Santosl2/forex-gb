import { motion, Variants } from "framer-motion";

import { LoginForm } from "@/components/templates";

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
    x: -100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={loginVariants}
        className="flex flex-col items-center justify-center h-full"
      >
        <h2 className="text-2xl">Welcome to Black Capital</h2>
        <LoginForm />
      </motion.div>
    </div>
  );
}
