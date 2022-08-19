import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { SignOut } from "phosphor-react";

import { Item } from "@/components/molecules/Sidebar/Item";
import { logout } from "@/shared/store/reducers/user";
import { logoutUser } from "@/shared/utils/auth/UserLogin";

import { CustomItemProps } from "../Item.types";

function LogoutBase({ hiddenText }: CustomItemProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogoutUser = useCallback(() => {
    dispatch(
      logout({
        accessToken: "",
        email: "",
        isAdmin: false,
        name: "",
        refreshToken: "",
        walletId: "",
        id: "",
      })
    );

    logoutUser();
    router.push("/");
  }, []);

  return (
    <span className="text-error text-bold">
      <Item
        onClick={handleLogoutUser}
        title="Logout"
        icon={<SignOut />}
        href="#"
        hiddenText={hiddenText}
      />
    </span>
  );
}

export const LogoutButton = memo(LogoutBase);
