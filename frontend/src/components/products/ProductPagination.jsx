import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductPagination({ loading, page, totalPages, setPage }) {
  if (loading || totalPages <= 1) return null;

  const pages = [];

  if (page > 1) pages.push(page - 1);
  pages.push(page);
  if (page < totalPages) pages.push(page + 1);

  return (
    <div className="mt-16 flex flex-col items-center gap-5">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex w-full max-w-xl items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            text-sm
            font-medium
            text-neutral-700
            transition
            hover:bg-neutral-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="mx-2 flex items-center gap-2">
          {pages.map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-sm
                font-semibold
                transition
                ${
                  number === page
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }
              `}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            text-sm
            font-medium
            text-neutral-700
            transition
            hover:bg-neutral-100
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductPagination);
