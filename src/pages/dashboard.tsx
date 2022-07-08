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

  return <Header id="menuDrawer" items={items} />;
}

export const getServerSideProps = AuthSSR(async (ctx) => {
  return {
    props: {},
  };
});
