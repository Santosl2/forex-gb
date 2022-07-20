import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/router";

import { Button, FormControl, Input } from "@/components/atoms";
import { useMutationLoginUser } from "@/shared/hooks/useMutation";
import { useUserLogin } from "@/shared/hooks/useUser";
import { loginSchema } from "@/shared/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginFormData } from "./Login.types";

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
    <form
      className="flex flex-col gap-3 w-full max-w-md p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <Input
          data-testid="emailTest"
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
          data-testid="passwordTest"
          id="password"
          type="password"
          label="Password"
          className="max-w-md"
          error={formState.errors.password?.message}
          {...register("password")}
        />
      </FormControl>

      <Button type="submit" isLoading={loginUser.isLoading}>
        Login
      </Button>
      <Link href="/register">
        <Button type="button" className="btn-link text-white">
          Create an account
        </Button>
      </Link>
    </form>
  );
}
