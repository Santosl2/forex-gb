import { useMemo } from "react";

import { classNames } from "@/shared/utils/classNames";

import { BadgeProps } from "./Badge.types";

export function Badge({ type, children }: BadgeProps) {
  const badgeClassNames = useMemo(() => {
    return classNames({
      badge: true,
      "gap-2": true,
      "badge-warning": type === "warning",
      "badge-success": type === "success",
      "badge-error": type === "error",
      "badge-info": type === "info",
    });
  }, [type]);

  return <div className={badgeClassNames}>{children}</div>;
}
