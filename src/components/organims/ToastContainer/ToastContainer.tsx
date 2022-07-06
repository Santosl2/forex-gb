import { LayoutGroup, motion, Variants } from "framer-motion";

import { ToastContainerProps } from "./ToastContainer.types";

const toastContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
  },
};

export function ToastContainer({ children }: ToastContainerProps) {
  return (
    <motion.div
      className="toastContainer sm:w-full lg:w-80"
      variants={toastContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <LayoutGroup>{children}</LayoutGroup>
    </motion.div>
  );
}
