import { ListItemProps } from "./ListItem.type";

export function ListItem({ link, title }: ListItemProps) {
  return <li>{title}</li>;
}
