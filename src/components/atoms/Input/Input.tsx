/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";

import { classNames } from "@/shared/utils/classNames";

import { Label } from "../Label";
import { InputProps } from "./Input.types";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...props },
  ref
) => {
  const hasError = !!error;

  const buttonClasses = useMemo(() => {
    return `${classNames({
      input: true,
      "input-bordered": true,
      "w-full": true,
      "text-red-error": hasError,
    })} ${props.className}`;
  }, [hasError, props.className]);

  return (
    <>
      {label && (
        <Label title={label} htmlFor={props.id ?? ""} hasError={hasError} />
      )}
      <input {...props} ref={ref} className={buttonClasses} />
      {hasError && <p className="self-start mt-3 text-red-error">{error}</p>}
    </>
  );
};

export const Input = forwardRef(InputBase);
