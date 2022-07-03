import Link from "next/link";

import { Button, FormControl, Input } from "@/components/atoms";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-3 w-full max-w-md p-4">
      <FormControl>
        <Input
          name="email"
          id="email"
          type="email"
          label="E-mail"
          className="max-w-md"
        />
      </FormControl>
      <FormControl>
        <Input
          name="password"
          id="password"
          type="password"
          label="Password"
          className="max-w-md"
        />
      </FormControl>

      <Button type="button">Login</Button>
      <Link href="/register">
        <Button type="button" className="btn-primary">
          Create an account
        </Button>
      </Link>
    </form>
  );
}
