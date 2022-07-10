/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, ForwardRefRenderFunction, useMemo } from "react";

import { classNames } from "@/shared/utils/classNames";

import { CopyButton } from "../CopyButton";
import { Label } from "../Label";
import { InputProps } from "./Input.types";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, id, enableCopyButton, ...props },
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
      {label && <Label title={label} htmlFor={id ?? ""} hasError={hasError} />}

      <div className="relative w-full">
        <input {...props} ref={ref} id={id} className={buttonClasses} />
        {hasError && <p className="self-start mt-3 text-red-error">{error}</p>}
        {enableCopyButton && id && <CopyButton copyId={id} isInput />}
      </div>
    </>
  );
};

export const Input = forwardRef(InputBase);
