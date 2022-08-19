import React from "react";

import { List, X } from "phosphor-react";

import { SidebarHeaderProps } from "./SiderbarHeader.types";

export function SidebarHeader({
  showLogo = true,
  onClickButton,
}: SidebarHeaderProps) {
  const icon = !showLogo ? <List size={24} /> : <X size={32} />;

  return (
    <div className="flex items-center justify-center" id="menuSidebar">
      {showLogo && (
        <h4 className="text-2xl text-white font-bold mr-2">
          Black Investiments
        </h4>
      )}
      {React.cloneElement(icon, {
        onClick: onClickButton,
        className: "cursor-pointer my-5",
        size: "24",
      })}
    </div>
  );
}
