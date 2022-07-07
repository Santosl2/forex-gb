import { useDispatch, useSelector } from "react-redux";

import { UserData } from "../interfaces/User";
import { setUser } from "../store/reducers/user";

export function useUser(): UserData {
  const user = useSelector((state: any) => state.user);
  return user;
}

export function useUserLogin() {
  const dispatch = useDispatch();

  return (data: UserData) => {
    dispatch(setUser(data));
  };
}
