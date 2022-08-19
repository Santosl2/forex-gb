/* eslint-disable react/function-component-definition */
/* eslint-disable react/button-has-type */
import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";

import { classNames } from "@/shared/utils/classNames";

import { ButtonProps } from "./Button.types";

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, isLoading, ...props },
  ref
) => {
  const buttonClasses = useMemo(() => {
    return `${classNames({
      btn: true,
      "w-full": true,
      "h-10": true,
      "min-h-0": true,
      loading: isLoading,
    })} ${props.className}`;
  }, [isLoading, props.className]);

  return (
    <button
      {...props}
      ref={ref}
      className={buttonClasses}
      disabled={props.disabled || isLoading}
    >
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonBase);
