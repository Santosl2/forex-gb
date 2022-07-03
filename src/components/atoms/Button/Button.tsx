/* eslint-disable react/button-has-type */
import { ButtonProps } from "./Button.types";

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn w-full ${props.className}`}>
      {children}
    </button>
  );
}
