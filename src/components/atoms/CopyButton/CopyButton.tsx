import { useCallback, useMemo, useState } from "react";

import { Check, CopySimple } from "phosphor-react";

import { classNames } from "@/shared/utils/classNames";

import { CopyButtonProps } from "./CopyButton.types";

export function CopyButton({ copyId, isInput = false }: CopyButtonProps) {
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
    return <Check size={24} className={copyClasses} />;
  }

  return <CopySimple size={22} className={copyClasses} onClick={handleClick} />;
}
