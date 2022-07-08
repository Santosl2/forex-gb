import { Variants } from "framer-motion";

import { Header } from "@/components/organims/Header";
import { AuthSSR } from "@/shared/utils/auth/AuthSSR";

const loginVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function Dashboard() {
  const items = [
    {
      id: 1,
      name: "Dashboard",
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      id: 2,
      name: "Organizations",
      icon: "organization",
      href: "/organizations",
    },
    {
      id: 3,
      name: "Users",
      icon: "user",
      href: "/users",
    },
  ];

  return (
    <>
      <Header id="menuDrawer" items={items} />
      <section className="max-w-[1120px] m-auto p-5 mt-5 relative z-10">
        <h2 className="text-4xl">Hello dear</h2>

        <div className="flex gap-5 overflow-y-auto w-full mt-5">
          <div className="w-full max-w-lg  bg-gray-600 p-5 rounded-md h-32 flex flex-col justify-between cursor-pointer">
            <h4 className="text-2xl">Amount</h4>
            <p className="text-xl">R$5000,00</p>
          </div>
          <div className="w-full max-w-lg  bg-gray-600 p-5 rounded-md h-32 flex flex-col justify-between cursor-pointer">
            <h4 className="text-2xl">Amount</h4>
            <p className="text-xl">R$5000,00</p>
          </div>
          <div className="w-full max-w-lg  bg-gray-600 p-5 rounded-md h-32 flex flex-col justify-between cursor-pointer">
            <h4 className="text-2xl">Amount</h4>
            <p className="text-xl">R$5000,00</p>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = AuthSSR(async (ctx) => {
  return {
    props: {},
  };
});
