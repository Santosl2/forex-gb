/* eslint-disable react/jsx-props-no-spreading */
import { Label } from "../Label";
import { InputProps } from "./Input.types";

export function Input({ label, ...props }: InputProps) {
  return (
    <>
      {label && <Label title={label} htmlFor={props.id ?? ""} />}
      <input
        {...props}
        className={`input input-bordered w-full ${props.className}`}
      />
    </>
  );
}
