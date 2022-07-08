import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";

import { Button, FormControl, Input } from "@/components/atoms";
import { useMutationRegisterUser } from "@/shared/hooks/useMutation";
import { useToastCreate } from "@/shared/hooks/useToast";
import { registerSchema } from "@/shared/schemas/register";
import { verifyRecaptcha } from "@/shared/utils/verifyRecaptcha";
import { yupResolver } from "@/shared/utils/yup";

import { EmailSent } from "../EmailSent";
import { RegisterFormData } from "./Register.types";

export function RegisterForm() {
  const [emailSent, setEmailSent] = useState(true);
  const registerUser = useMutationRegisterUser();
  const toast = useToastCreate();

  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const recaptchaVerify = await verifyRecaptcha();

    if (recaptchaVerify) {
      try {
        await registerUser.mutateAsync({
          ...data,
          captchaToken: recaptchaVerify,
        });

        setEmailSent(true);
      } catch (e: any) {
        toast(e.response?.data?.message ?? "Internal server error", {
          type: "error",
        });
      }
    }
  };

  if (emailSent) return <EmailSent />;

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

      <Button isLoading={registerUser.isLoading}>Register</Button>
      <Link href="/">
        <Button className="btn-link text-white">Sign in instead</Button>
      </Link>
    </form>
  );
}
