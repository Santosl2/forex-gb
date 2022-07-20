import { FormEvent } from "react";
import { toast } from "react-toastify";

import { useMutationSendIncomes } from "@/shared/hooks/useMutation";

import { Button } from "../../Button";

export function RunYield() {
  const sendIncome = useMutationSendIncomes();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const sendIncomeData = await sendIncome.mutateAsync();

      if (!sendIncomeData.success) {
        toast(sendIncomeData.message, { type: "info" });

        return;
      }

      toast.success(sendIncomeData.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Internal server error");
    }
  };

  return (
    <Button
      className="text-white btn-circle btn-error"
      isLoading={sendIncome.isLoading}
      onClick={onSubmit}
    >
      Run Incomes
    </Button>
  );
}
