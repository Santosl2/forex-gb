import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";

import { logout } from "@/shared/store/reducers/user";

import { Button } from "../Button";

function LogoutBase() {
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

    router.push("/");
  }, []);

  return (
    <Button
      className="btn-error btn-circle absolute right-5 bottom-5 z-10 w-24"
      onClick={handleLogoutUser}
    >
      Logout
    </Button>
  );
}

export const LogoutButton = memo(LogoutBase);
