/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Sidebar } from "@/components/molecules/Sidebar";

import { HeaderProps } from "./Header.types";

export function Header({ id }: HeaderProps) {
  return <Sidebar />;
}
