import { memo, useCallback, useMemo, useState } from "react";

import { Check, CopySimple } from "phosphor-react";

import { classNames } from "@/shared/utils/classNames";

import { CopyButtonProps } from "./CopyButton.types";

function CopyBase({ copyId, isInput = false, size = 22 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyClasses = useMemo(() => {
    return classNames({
      absolute: isInput,
      "right-3": isInput,
      "top-3": isInput,
      "cursor-pointer": true,
    });
  }, [isInput]);

  const handleClick = useCallback(async () => {
    let timeout;
    const getElementToCopy = document.querySelector(`#${copyId}`);

    const text =
      getElementToCopy?.innerHTML ||
      (getElementToCopy as HTMLInputElement).value;

    await navigator.clipboard.writeText(text);
    setCopied(true);

    await new Promise(() => {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    });

    clearTimeout(timeout);
  }, [copyId]);

  if (copied) {
    return <Check size={size} className={copyClasses} />;
  }

  return (
    <CopySimple size={size} className={copyClasses} onClick={handleClick} />
  );
}

export const CopyButton = memo(CopyBase);
