import { useDispatch, useSelector } from "react-redux";

import { Toast } from "../interfaces/Toast";
import { addToast } from "../store/reducers/toast";

export function useToast(): Toast[] {
  const toast = useSelector((state: any) => state.toast);
  return toast;
}

export function useToastCreate() {
  const toast = useToast();
  const dispatch = useDispatch();
  const lastToastID = Number(toast.at(-1)?.id || 0);

  return (message: string, { type }: Pick<Toast, "type">) => {
    dispatch(
      addToast({
        id: lastToastID + 1,
        message,
        type,
      })
    );
  };
}
