import { Input } from "@/components/atoms";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-3 w-full max-w-md p-4">
      <div className="form-control w-full items-center">
        <Input
          name="email"
          id="email"
          type="text"
          label="E-mail"
          className="max-w-md"
        />
      </div>
      <div className="form-control w-full items-center">
        <Input
          name="password"
          id="password"
          type="password"
          label="Password"
          className="max-w-md"
        />
      </div>

      <button className="btn w-full" type="submit">
        Login
      </button>
      <button className="btn  w-full btn-active btn-primary" type="button">
        Create an account
      </button>
    </form>
  );
}
