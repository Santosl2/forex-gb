/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, ForwardRefRenderFunction } from "react";

import { Label } from "../Label";
import { InputProps } from "./Input.types";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...props },
  ref
) => {
  const hasError = !!error;

  return (
    <>
      {label && (
        <Label title={label} htmlFor={props.id ?? ""} hasError={hasError} />
      )}
      <input
        {...props}
        ref={ref}
        className={`input input-bordered w-full ${props.className} ${
          hasError && "text-red-error"
        }`}
      />
      {hasError && <p className="self-start mt-3 text-red-error">{error}</p>}
    </>
  );
};

export const Input = forwardRef(InputBase);
