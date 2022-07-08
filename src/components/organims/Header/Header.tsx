/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Drawer, DrawerOpen } from "@/components/molecules/Drawer";

import { HeaderProps } from "./Header.types";
import { Notification } from "./Notification";
import { Search } from "./Search";

export function Header({ id, items }: HeaderProps) {
  return (
    <>
      <header className="navbar bg-base-300">
        <div className="navbar-start">
          <DrawerOpen id={id} />
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl" href="#">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </a>
        </div>
        <div className="navbar-end">
          <Search />
          <Notification />
        </div>
      </header>
      <Drawer id={id} items={items} />
    </>
  );
}
