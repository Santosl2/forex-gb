/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, FormControl, Input, Logo } from "@/components/atoms";
import { useMutationLoginUser } from "@/shared/hooks/useMutation";
import { useUserLogin } from "@/shared/hooks/useUser";
import { loginSchema } from "@/shared/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginFormData } from "./Login.types";

const imgVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export function LoginForm() {
  const loginUser = useMutationLoginUser();

  const user = useUserLogin();

  const router = useRouter();

  const { register, handleSubmit, formState, reset } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const loginData = await loginUser.mutateAsync(data);

      if (!loginData.success) {
        toast(loginData.message, { type: "info" });

        return;
      }

      toast.success("Login successfully!");

      user({
        ...loginData?.user,
        accessToken: loginData?.accessToken,
        refreshToken: loginData?.refreshToken,
      });

      router.push("/dashboard");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Internal server error");
    } finally {
      reset();
    }
  };

  return (
    <div className="w-full max-w-5xl flex justify-between">
      <div className="md:w-[29rem] w-full">
        <Logo />
        <form
          className="flex flex-col gap-3 w-full p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-2xl bold">Sign In</h3>
          <p className="text-xs">Enter your email and password to sign in</p>
          <FormControl>
            <Input
              data-testid="emailTest"
              id="email"
              type="email"
              label="E-mail"
              error={formState.errors.email?.message}
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <Input
              data-testid="passwordTest"
              id="password"
              type="password"
              label="Password"
              error={formState.errors.password?.message}
              {...register("password")}
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={loginUser.isLoading}
            className="my-5 bg-green-700 hover:bg-green-800	text-white"
          >
            Login
          </Button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" passHref>
              <a className="text-white underline underline-offset-4 font-semibold">
                Create an account
              </a>
            </Link>
          </p>
        </form>
      </div>
      <div className="w-[32rem] h-full hidden md:block">
        <motion.img
          initial="initial"
          animate="animate"
          exit="exit"
          variants={imgVariants}
          src="/images/index-black.webp"
          className="w-full h-full max-w-auto rounded-lg self-stretch object-cover object-center"
        />
      </div>
    </div>
  );
}
