/* eslint-disable jsx-a11y/label-has-associated-control */
import { Info } from "phosphor-react";

export function Notification() {
  return (
    <div>
      <label
        htmlFor="notificationCenter"
        className="w-12 btn btn-ghost btn-circle"
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-primary indicator-item" />
        </div>
      </label>
      <input
        type="checkbox"
        className="appearance-none hidden"
        id="notificationCenter"
      />
      <div className="hidden fixed bg-zinc-900 rounded w-full z-20 h-full md:w-96 md:max-h-[500px] overflow-y-auto right-0 top-[60px] gap-2">
        <div className="flex w-full p-3  max-h-20 flex-row gap-2 cursor-pointer hover:bg-zinc-800 transition-all ">
          <span>
            <Info size={24} />
          </span>
          <p>Your payment has been approved!</p>
        </div>
        <div className="flex w-full p-3 max-h-20 flex-row gap-2 cursor-pointer hover:bg-zinc-800 transition-all ">
          <span>
            <Info size={24} />
          </span>
          <p>Your payment has been declined!</p>
        </div>
      </div>{" "}
    </div>
  );
}
