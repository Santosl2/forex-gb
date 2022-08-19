/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Link from "next/link";

import { Button, FormControl, Input } from "@/components/atoms";
import { useMutationRegisterUser } from "@/shared/hooks/useMutation";
import { registerSchema } from "@/shared/schemas/register";
import { verifyRecaptcha } from "@/shared/utils/verifyRecaptcha";
import { yupResolver } from "@/shared/utils/yup";

import { RegisterFormData } from "./Register.types";

export function RegisterForm() {
  // const [emailSent, setEmailSent] = useState(false);
  const registerUser = useMutationRegisterUser();

  const { register, handleSubmit, formState, reset } =
    useForm<RegisterFormData>({
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

        toast.success(
          "Successfully registered! Now you can login in your account."
        );
        reset();
        // setEmailSent(true);
      } catch (e: any) {
        toast.warning(e.response?.data?.message ?? "Internal server error");
      }
    }
  };

  // if (emailSent) return <EmailSent />;

  return (
    <div className="w-full max-w-5xl flex justify-center">
      <form
        className="flex flex-col gap-3 w-full max-w-md   p-8"
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
        <label className="text-sm my-5">
          <input type="checkbox" className="checkbox checkbox-sm" /> Agree to
          the terms and conditions of the service.
        </label>

        <Button
          isLoading={registerUser.isLoading}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          Register
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/" passHref>
            <a className="text-white underline underline-offset-4 font-semibold">
              Sign in
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
}
