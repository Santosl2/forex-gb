import { LoginForm } from "@/components";

/* eslint-disable jsx-a11y/control-has-associated-label */
export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <LoginForm />
      </div>
    </div>
  );
}
