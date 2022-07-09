import { Variants } from "framer-motion";

import { Header } from "@/components/organims/Header";
import { SEO } from "@/SEO";
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
      <SEO title="Dashboard" />
      <Header id="menuDrawer" items={items} />
      <section className="max-w-[1120px] m-auto p-5 mt-5 relative z-10">
        <h2 className="text-4xl">Hello dear</h2>

        <div className="flex gap-5 w-full mt-5 overflow-y-auto items-center justify-center">
          <div className="stats shadow">
            <div className="stat bg-base-200  place-items-center w-72">
              <div className="stat-title">Your amount</div>
              <div className="stat-value text-primary">25.6K</div>
            </div>

            <div className="stat bg-base-200 place-items-center w-96">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="stat-title">Percent of this month</div>
              <div className="stat-value text-secondary">2.6%</div>
            </div>

            <div className="stat bg-base-200 place-items-center w-72">
              <div className="stat-value">86%</div>
              <div className="stat-title">Tasks done</div>
            </div>
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
