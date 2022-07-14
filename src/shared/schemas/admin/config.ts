import { yup } from "@/shared/utils/yup";

export type UpdatePercentFormData = {
  percent: number;
};

export const updatePercentSchema = yup.object({
  percent: yup.number().required("Percent is required"),
});
