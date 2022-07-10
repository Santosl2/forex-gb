/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Upload } from "phosphor-react";

import { ALLOWED_UPLOAD_TYPES } from "@/shared/constants";
import { classNames } from "@/shared/utils/classNames";

import { Label } from "../Label";
import { InputProps } from "./Input.types";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, id, ...props },
  ref
) => {
  const hasError = !!error;
  const [currentFile, setCurrentFile] = useState<File>();

  const buttonClasses = useMemo(() => {
    return `${classNames({
      input: true,
      "input-bordered": true,
      "w-full": true,
      "text-red-error": hasError,
      customInputFile: props.type === "file",
    })} ${props.className}`;
  }, [hasError, props.className]);

  const onUpdateFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    const file = target.files?.item(0);

    if (!file) {
      return;
    }
    if (ALLOWED_UPLOAD_TYPES.includes(file.type)) {
      setCurrentFile(file);
    }
  }, []);

  return (
    <>
      {label &&
        (props.type !== "file" ? (
          <Label title={label} htmlFor={id ?? ""} hasError={hasError} />
        ) : (
          <label
            htmlFor={id}
            className="btn flex items-center gap-2 bg-purple-800 text-white hover:bg-purple-900 hover:border-purple-900 border-purple-800"
          >
            <Upload size={20} /> {currentFile?.name ? currentFile.name : label}
          </label>
        ))}

      <input
        {...props}
        ref={ref}
        id={id}
        className={buttonClasses}
        onChange={props.type === "file" ? onUpdateFile : () => {}}
      />
      {hasError && <p className="self-start mt-3 text-red-error">{error}</p>}
    </>
  );
};

export const Input = forwardRef(InputBase);
