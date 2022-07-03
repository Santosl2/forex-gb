import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { FormControl } from "@/components/atoms/FormControl";
import { Input } from "@/components/atoms/Input";

export function RegisterForm() {
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
          name="username"
          id="username"
          type="text"
          label="Username"
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

      <FormControl>
        <Input
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          className="max-w-md"
        />
      </FormControl>

      <Button>Register</Button>
      <Link href="/">
        <Button className="btn-link text-white">Sign in instead</Button>
      </Link>
    </form>
  );
}
