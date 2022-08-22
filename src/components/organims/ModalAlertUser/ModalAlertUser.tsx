import { useEffect, useRef } from "react";

import party from "party-js";

import { Button } from "@/components/atoms";

import { ModalAlertUserProps } from "./ModalAlertUser.types";

export function ModalAlertUser({ onClose }: ModalAlertUserProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      party.confetti(modalRef.current, {
        count: 80,
      });
    }
  }, []);

  return (
    <div
      className="modal text-white visible opacity-100 z-50 pointer-events-auto w-full"
      ref={modalRef}
    >
      <div className="modal-box w-full">
        <div className="overflow-x-auto">
          <h4 className="text-4xl mb-5 bold text-red-300">Congratulations!</h4>
          <p className="text-md">Monthly income successfully achieving!</p>
        </div>
        <div className="modal-action">
          <Button className="w-full" type="button" onClick={onClose}>
            Ok, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
}
