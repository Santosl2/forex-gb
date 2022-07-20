import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useMutationUpdatePercent } from "@/shared/hooks/useMutation";
import { useGLobalPercent } from "@/shared/hooks/useQuery";
import {
  UpdatePercentFormData,
  updatePercentSchema,
} from "@/shared/schemas/admin/config";
import { yupResolver } from "@/shared/utils/yup";

import { Button } from "../../Button";
import { Input } from "../../Input";
import { Spinner } from "../../Spinner";
import { RunYield } from "../RunYield";

export function UpdatePercent() {
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
    <form
      className="w-full max-w-sm bg-base-300 p-5 rounded"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-2xl mb-5 flex gap-3">
        Update percent {isLoading && <Spinner />}
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
      <Button className="btn-info mb-5" isLoading={updatePercent.isLoading}>
        Update percent
      </Button>

      {updatePercent.isSuccess && <RunYield />}
    </form>
  );
}
