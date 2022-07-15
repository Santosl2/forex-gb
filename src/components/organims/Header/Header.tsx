/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Drawer, DrawerOpen } from "@/components/molecules/Drawer";

import { AddMoney } from "./AddMoney";
import { HeaderProps } from "./Header.types";
import { Wallet } from "./Wallet";

export function Header({ id }: HeaderProps) {
  return (
    <>
      <header className="navbar bg-base-300 border-b border-gray-900">
        <div className="navbar-start">
          <DrawerOpen id={id} />
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl" href="#">
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </a>
        </div>
        <div className="navbar-end">
          <Wallet />
          <AddMoney />
        </div>
      </header>
      <Drawer id={id} />
    </>
  );
}
