/* eslint-disable import/no-cycle */
import { Sidebar } from "@/components/molecules/Sidebar";

import { ContainerProps } from "./Container.types";

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />

      {children}
    </div>
  );
}
