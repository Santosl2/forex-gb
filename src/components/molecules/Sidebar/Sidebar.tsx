import { useCallback, useMemo, useState } from "react";

import { HEADER_ADMIN_ITEMS, HEADER_USER_ITEMS } from "@/shared/constants";
import { useUser } from "@/shared/hooks/useUser";
import { classNames } from "@/shared/utils/classNames";

import { SidebarHeader } from "./Header";
import { Item } from "./Item";
import { AddMoney } from "./Item/AddMoney";
import { FloatingButton } from "./Item/FloatingButton";
import { LogoutButton } from "./Item/LogoutButton";
import { Wallet } from "./Item/Wallet";

export function Sidebar() {
  const [isClose, setIsClose] = useState(true);

  const user = useUser();

  const formattedItems = useMemo(() => {
    if (user.isAdmin) return HEADER_ADMIN_ITEMS;
    return HEADER_USER_ITEMS;
  }, [user]);

  const sidebarClasses = useMemo(() => {
    return classNames({
      "h-full": true,
      fixed: false,
      "top-0": true,
      "bg-gray-box": true,
      "z-[500]": true,
      "transition-all": true,
      "duration-500": true,
      hidden: isClose,
      "md:block": true,
      "md:w-80": !isClose,
      "w-[100%]": !isClose,
      "w-[80px]": isClose,
      "touch-none": true,
    });
  }, [isClose]);

  const handleOpenOrClose = useCallback(() => {
    setIsClose((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsClose(true);
  }, []);

  return (
    <>
      <FloatingButton onClick={handleOpenOrClose} />
      <nav className={sidebarClasses}>
        <div className="flex flex-col justify-between h-[100%]">
          <ul className="p-4">
            <SidebarHeader
              showLogo={!isClose}
              onClickButton={handleOpenOrClose}
            />

            {formattedItems.map((item) => (
              <Item
                onClick={handleClose}
                key={item.id}
                title={item.name}
                icon={<item.icon />}
                href={item.href}
                hiddenText={isClose}
              />
            ))}
          </ul>

          <ul className="p-4">
            <Wallet onClick={handleClose} hiddenText={isClose} />
            <AddMoney onClick={handleClose} hiddenText={isClose} />
            <LogoutButton hiddenText={isClose} />
          </ul>
        </div>
      </nav>
    </>
  );
}
