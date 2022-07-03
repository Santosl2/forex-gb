/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, ForwardRefRenderFunction } from "react";

import { Label } from "../Label";
import { InputProps } from "./Input.types";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, ...props },
  ref
) => {
  return (
    <>
      {label && <Label title={label} htmlFor={props.id ?? ""} />}
      <input
        {...props}
        ref={ref}
        className={`input input-bordered w-full ${props.className}`}
      />
    </>
  );
};

export const Input = forwardRef(InputBase);
