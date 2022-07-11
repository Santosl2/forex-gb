import { Plus } from "phosphor-react";

export function AddMoney() {
  return (
    <label
      htmlFor="modalAdd"
      className=" btn  btn-ghost btn-circle whitespace-nowrap ml-5 flex flex-row gap-2 items-center justify-center modal-button "
    >
      <Plus size={20} />{" "}
    </label>
  );
}
