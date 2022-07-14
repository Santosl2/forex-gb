import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { motion, Variants } from "framer-motion";

import { Button, Input, Spinner } from "@/components/atoms";
import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
import { useMutationUpdatePercent } from "@/shared/hooks/useMutation";
import { useGLobalPercent } from "@/shared/hooks/useQuery";
import {
  UpdatePercentFormData,
  updatePercentSchema,
} from "@/shared/schemas/admin/config";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const { data: percentData, isLoading } = useGLobalPercent();
  const updatePercent = useMutationUpdatePercent();

  const { register, handleSubmit, formState } = useForm<UpdatePercentFormData>({
    resolver: yupResolver(updatePercentSchema),
  });

  const onSubmit: SubmitHandler<UpdatePercentFormData> = async (data) => {
    try {
      const percentUpdated = await updatePercent.mutateAsync(data.percent);

      if (!percentUpdated.success) {
        toast(percentUpdated.message, { type: "info" });

        return;
      }

      toast.success(percentUpdated.message);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Internal server error");
    }
  };

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
        <h2 className="text-4xl">Update project configs</h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto">
          <form
            className="w-full max-w-sm bg-base-300 p-5 rounded"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="text-2xl mb-5 flex gap-3">
              Global percent {isLoading && <Spinner />}
            </h4>
            <Input
              id="percent"
              className="mb-5"
              {...register("percent")}
              defaultValue={percentData?.percent}
              type="number"
              step="any"
              error={formState.errors.percent?.message}
            />
            <Button className="btn-info" isLoading={updatePercent.isLoading}>
              Update percent
            </Button>
            <small>* The yield occurs every day at 0:00 UTC.</small>
          </form>
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
