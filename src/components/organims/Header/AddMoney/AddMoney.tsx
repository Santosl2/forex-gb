import { CurrencyDollarSimple } from "phosphor-react";

export function AddMoney() {
  return (
    <label
      htmlFor="modalAdd"
      className="w-36 btn btn-error whitespace-nowrap ml-5 flex flex-row gap-2 items-center justify-center modal-button "
    >
      Add Money
      <CurrencyDollarSimple size={20} />{" "}
    </label>
  );
}
