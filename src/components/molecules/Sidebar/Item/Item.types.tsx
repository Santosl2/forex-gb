import { ReactElement } from "react";

export type ItemProps = {
  title: string;
  icon: ReactElement;
  href?: string;
  onClick?: () => void;
  hiddenText: boolean;
  showIndicator?: boolean;
};

export type CustomItemProps = Pick<ItemProps, "hiddenText" | "onClick">;
