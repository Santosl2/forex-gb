import { BackgroundHeaderProps } from "./BackgroundHeader.types";

export function BackgroundHeader({
  bgColor = "rgb(19,48,80)",
}: BackgroundHeaderProps) {
  return <div className={`w-full h-52 absolute z-0 bg-[${bgColor}]`} />;
}
