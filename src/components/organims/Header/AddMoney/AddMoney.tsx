import { CurrencyDollarSimple } from "phosphor-react";

export function AddMoney() {
  return (
    <label
      htmlFor="modalAdd"
      className="sm:w-16 btn btn-error whitespace-nowrap ml-5 flex flex-row gap-2 items-center justify-center modal-button "
    >
      <CurrencyDollarSimple size={20} />{" "}
    </label>
  );
}
