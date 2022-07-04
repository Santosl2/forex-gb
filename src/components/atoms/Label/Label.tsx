/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from "react";

import { LabelProps } from "./Label.types";

function LabelBase({ title, htmlFor, hasError }: LabelProps) {
  return (
    <label className="label self-start" htmlFor={htmlFor}>
      <span className={`label-text ${hasError && "text-red-error"}	`}>
        {title}
      </span>
    </label>
  );
}

export const Label = memo(LabelBase);
