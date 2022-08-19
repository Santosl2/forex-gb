/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useMemo } from "react";

import { useRouter } from "next/router";

import { classNames } from "@/shared/utils/classNames";

import { ItemProps } from "./Item.types";

export function Item({
  title,
  icon,
  href,
  onClick,
  hiddenText,
  showIndicator = false,
}: ItemProps) {
  const router = useRouter();

  const textClass = useMemo(() => {
    return classNames({
      hidden: hiddenText,
      "ml-2": !hiddenText,
    });
  }, [hiddenText]);

  const handleClick = useCallback(() => {
    onClick?.();

    if (href) {
      router.push(href);
    }
  }, [onClick, href, router]);

  const liClass = useMemo(() => {
    return classNames({
      flex: true,
      relative: true,
      "p-2": true,
      "hover:bg-menu-hover": true,
      "transition-all": true,
      "ease-in": true,
      "cursor-pointer": true,
      "rounded-md": true,
      "items-center": true,
      "mt-5": true,
      "h-12": true,
      "justify-center": hiddenText,
    });
  }, [hiddenText]);

  return (
    <li onClick={handleClick} className={liClass}>
      {React.cloneElement(icon, { size: "24" })}
      <span className={textClass}>{title}</span>
      {showIndicator && (
        <span className="flex h-3 w-3 absolute right-0 top-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 right-0" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
      )}
    </li>
  );
}
