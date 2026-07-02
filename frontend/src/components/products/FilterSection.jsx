import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="
        border-b
        border-neutral-200
        last:border-none
      "
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
        group
        w-full
        flex
        items-center
        justify-between
        py-5
        px-1
        rounded-xl
        transition-all
        duration-300
        hover:bg-neutral-50
      "
      >
        <span
          className="
      text-[15px]
      font-semibold
      tracking-wide
      text-neutral-900
    "
        >
          {title}
        </span>

        <div
          className={`
      flex
      items-center
      justify-center
      w-9
      h-9
      rounded-full
      transition-all
      duration-300
      ${
        open
          ? "bg-neutral-200 text-neutral-800"
          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
      }
    `}
        >
          <ChevronDown
            size={18}
            className={`
        transition-transform
        duration-300
        ${open ? "rotate-180" : ""}
      `}
          />
        </div>
      </button>

      <div
        className={`
          grid
          transition-all
          duration-500
          ease-in-out
          ${
            open
              ? "grid-rows-[1fr] opacity-100 pb-5"
              : "grid-rows-[0fr] opacity-0 pb-0"
          }
        `}
      >
        <div
          className="
            overflow-hidden
            px-4
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FilterSection);
