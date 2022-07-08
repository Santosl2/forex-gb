/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from "next/link";

import { DrawerProps } from "./Drawer.types";

export function Drawer({ id, items }: DrawerProps) {
  return (
    <div className="drawer">
      <input id={id} type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label htmlFor={id} className="drawer-overlay" />
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {items.map((item) => (
            <Link href={item.href} key={item.id} passHref>
              <li>
                <a>{item.name} </a>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
