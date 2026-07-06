import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        px-1
        py-2
        transition-colors
        hover:bg-neutral-50
      "
      >
        <span className="text-[15px] font-semibold text-neutral-900">
          {title}
        </span>

        <div
          className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${
            open
              ? "bg-neutral-200 text-neutral-800"
              : "bg-neutral-100 text-neutral-500"
          }
        `}
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      <div
        className={`
        grid
        overflow-hidden
        transition-all
        duration-300
        ${
          open
            ? "grid-rows-[1fr] opacity-100 pb-4"
            : "grid-rows-[0fr] opacity-0"
        }
      `}
      >
        <div className="overflow-hidden px-1">{children}</div>
      </div>
    </div>
  );
}

export default React.memo(FilterSection);
