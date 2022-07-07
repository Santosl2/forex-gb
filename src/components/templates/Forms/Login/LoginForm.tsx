import { SubmitHandler, useForm } from "react-hook-form";

import Link from "next/link";

import { Button, FormControl, Input } from "@/components/atoms";
import { loginSchema } from "@/shared/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginFormData } from "./Login.types";

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
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

      <Button type="submit">Login</Button>
      <Link href="/register">
        <Button type="button" className="btn-primary">
          Create an account
        </Button>
      </Link>
    </form>
  );
}
