/* eslint-disable jsx-a11y/label-has-associated-control */
import { LabelProps } from "./Label.types";

export function Label({ title, htmlFor }: LabelProps) {
  return (
    <label className="label self-start" htmlFor={htmlFor}>
      <span className="label-text">{title}</span>
    </label>
  );
}
