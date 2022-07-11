/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import Link from "next/link";

import { ListItem } from "@/components/atoms";
import { HEADER_ADMIN_ITEMS, HEADER_USER_ITEMS } from "@/shared/constants";
import { useUser } from "@/shared/hooks/useUser";

import { DrawerProps } from "./Drawer.types";

export function Drawer({ id }: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const user = useUser();

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  const formatedItems = useMemo(() => {
    if (user.isAdmin) return HEADER_ADMIN_ITEMS;
    return HEADER_USER_ITEMS;
  }, [user]);

  if (!mounted) return <></>;

  return createPortal(
    <div className="drawer absolute z-1 top-[64px] h-[calc(100vh-64px)]">
      <input id={id} type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay bg-black z-10" />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content border-r border-gray-900 z-20">
          {formatedItems.map((item) => (
            <Link href={item.href} key={item.id} passHref>
              <a>
                <ListItem>
                  <a>{item.name} </a>
                </ListItem>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>,
    // @ts-ignore
    document.querySelector("#drawerPortal")
  );
}
