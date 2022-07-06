/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { motion, Variants } from "framer-motion";

import { ToastSVG } from "@/components/atoms";
import { Toast } from "@/shared/interfaces/Toast";
import { removeToast } from "@/shared/store/reducers/toast";

const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      mass: 0.5,
    },
  },
};

export function Toast({ id, type = "success", message }: Toast) {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  const setIsOpen = () => {
    setIsVisible(false);
    dispatch(
      removeToast({
        id,
      })
    );
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center w-full max-w-xs p-4 mb-4 min-w-full bg-gray-800 rounded-md shadow text-gray-200"
      role="alert"
      layout="position"
    >
      <ToastSVG type={type} />

      <div className="ml-3 text-sm font-normal">{message}</div>

      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5  text-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-700 inline-flex h-8 w-8 transition-all"
        aria-label="Close"
        onClick={setIsOpen}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </motion.div>
  );
}
