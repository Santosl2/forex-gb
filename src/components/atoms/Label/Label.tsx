/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo, useMemo } from "react";

import { classNames } from "@/shared/utils/classNames";

import { LabelProps } from "./Label.types";

function LabelBase({ title, htmlFor, hasError }: LabelProps) {
  const buttonClasses = useMemo(() => {
    return classNames({
      "label-text": true,
      "text-red-error": hasError,
    });
  }, [hasError]);

  return (
    <label className="label self-start" htmlFor={htmlFor}>
      <span className={buttonClasses}>{title}</span>
    </label>
  );
}

export const Label = memo(LabelBase);
