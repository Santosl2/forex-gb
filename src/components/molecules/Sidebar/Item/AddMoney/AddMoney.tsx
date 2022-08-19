/* eslint-disable jsx-a11y/label-has-associated-control */
import { Plus } from "phosphor-react";

import { Item } from "../Item";
import { CustomItemProps } from "../Item.types";

export function AddMoney({ hiddenText, onClick }: CustomItemProps) {
  return (
    <label htmlFor="modalAdd">
      <Item
        icon={<Plus />}
        title="Add money"
        hiddenText={hiddenText}
        onClick={onClick}
      />
    </label>
  );
}
