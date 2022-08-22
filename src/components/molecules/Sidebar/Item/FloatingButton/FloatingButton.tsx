import { List } from "phosphor-react";

import { Button } from "@/components/atoms";

import { CustomItemProps } from "../Item.types";

export function FloatingButton({ onClick }: Pick<CustomItemProps, "onClick">) {
  return (
    <Button
      className="fixed right-2 top-2 bg-gray-box w-24 z-20 flex items-center justify-center md:hidden"
      onClick={onClick}
    >
      <List size={20} /> Menu
    </Button>
  );
}
