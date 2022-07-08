import { AnimatePresence, motion } from "framer-motion";

import { Toast } from "@/components/molecules";
import { useToast } from "@/shared/hooks/useToast";

export function ToastContainer() {
  const toast = useToast();

  return (
    <motion.div
      className="toastContainer sm:w-full lg:w-80"
      transition={{
        layout: {
          duration: 1,
        },
      }}
    >
      <AnimatePresence exitBeforeEnter presenceAffectsLayout>
        {toast.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} id={t.id} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
