import { yup } from "@/shared/utils/yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Please insert a valid e-mail")
      .required("E-mail is required"),
    password: yup.string().required("Password is required"),
  })
  .required();
