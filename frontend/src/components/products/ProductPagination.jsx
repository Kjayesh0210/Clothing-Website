import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination({ loading, page, totalPages, setPage }) {
  if (loading || totalPages <= 1) return null;

  return (
    <div
      className="
        mt-20
        flex
        flex-col
        items-center
        gap-6
      "
    >
      {/* Page Info */}

      <p
        className="
          text-sm
          uppercase
          tracking-[0.25em]
          text-neutral-500
        "
      >
        Page {page} of {totalPages}
      </p>

      {/* Pagination */}

      <div
        className="
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-neutral-200
          bg-white
          p-3
          shadow-[0_12px_40px_rgba(0,0,0,0.06)]
        "
      >
        {/* Previous */}

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            flex
            items-center
            gap-2
            rounded-full
            px-5
            py-3
            text-sm
            font-medium
            text-neutral-700
            transition-all
            duration-300
            hover:bg-neutral-100
            hover:-translate-y-0.5
            disabled:opacity-40
            disabled:cursor-not-allowed
            disabled:hover:bg-transparent
            disabled:hover:translate-y-0
          "
        >
          <ChevronLeft size={18} />

          {/* <span>Previous</span> */}
        </button>

        {/* Page Numbers */}

        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`
                h-11
                w-11
                rounded-full
                text-sm
                font-semibold
                transition-all
                duration-300
                ${
                  page === index + 1
                    ? "bg-black text-white shadow-lg scale-105"
                    : "text-neutral-700 hover:bg-neutral-100 hover:-translate-y-0.5"
                }
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Next */}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            flex
            items-center
            gap-2
            rounded-full
            px-5
            py-3
            text-sm
            font-medium
            text-neutral-700
            transition-all
            duration-300
            hover:bg-neutral-100
            hover:-translate-y-0.5
            disabled:opacity-40
            disabled:cursor-not-allowed
            disabled:hover:bg-transparent
            disabled:hover:translate-y-0
          "
        >
          {/* <span>Next</span> */}

          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductPagination);