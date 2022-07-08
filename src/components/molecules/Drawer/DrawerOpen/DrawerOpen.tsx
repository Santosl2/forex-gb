/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback } from "react";

import { DrawerProps } from "../Drawer.types";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
export function DrawerOpen({ id }: Pick<DrawerProps, "id">) {
  const handleClick = useCallback(() => {
    const swapCheckbox = document.getElementById("swapId") as HTMLInputElement;

    swapCheckbox.checked = !swapCheckbox.checked;
  }, []);

  return (
    <label
      tabIndex={0}
      htmlFor={id}
      className="btn btn-ghost btn-circle"
      onClick={handleClick}
    >
      <div className="swap swap-rotate">
        <input type="checkbox" id="swapId" className="hidden" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="swap-off h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>

        <svg
          className="swap-on fill-current w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </div>
    </label>
  );
}
