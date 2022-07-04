import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";

import { Button, FormControl, Input } from "@/components/atoms";
import { yup, yupResolver } from "@/shared/utils/yup";

import { RegisterFormData } from "./Register.types";

const registerSchema = yup
  .object({
    email: yup
      .string()
      .email("Please insert a valid e-mail")
      .required("E-mail is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Use 3 characters or more for your username")
      .max(24, "Username must be less than 24 characters")
      .matches(/^[\w\s]+$/gi, "Don't use special character in your username."),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Use 6 characters or more for your password")
      .max(30, "Password must be less than 30 characters")
      .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/gm,
        "Password must contain at least 6 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Those passwords didn’t match. Try again."),
  })
  .required();

export function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-3 w-full max-w-md p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <Input
          data-testid="username"
          id="username"
          type="text"
          label="Username"
          className="max-w-md"
          error={formState.errors.username?.message}
          {...register("username")}
        />
      </FormControl>

      <FormControl>
        <Input
          data-testid="email"
          id="email"
          type="email"
          label="E-mail"
          className="max-w-md"
          error={formState.errors.email?.message}
          {...register("email")}
        />
      </FormControl>

      <FormControl>
        <Input
          data-testid="password"
          id="password"
          type="password"
          label="Password"
          className="max-w-md"
          error={formState.errors.password?.message}
          {...register("password")}
        />
      </FormControl>

      <FormControl>
        <Input
          data-testid="confirmPassword"
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          className="max-w-md"
          error={formState.errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </FormControl>

      <Button>Register</Button>
      <Link href="/">
        <Button className="btn-link text-white">Sign in instead</Button>
      </Link>
    </form>
  );
}
