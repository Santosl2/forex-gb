/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Link from "next/link";

import { ListItem } from "@/components/atoms";

import { DrawerProps } from "./Drawer.types";

export function Drawer({ id, items }: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) return <></>;

  return createPortal(
    <div className="drawer absolute z-1 top-[64px]">
      <input id={id} type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
          {items.map((item) => (
            <Link href={item.href} key={item.id} passHref>
              <ListItem>
                <a>{item.name} </a>
              </ListItem>
            </Link>
          ))}
        </ul>
      </div>
    </div>,
    // @ts-ignore
    mounted ? document.querySelector("#drawerPortal") : window.document.body
  );
}
