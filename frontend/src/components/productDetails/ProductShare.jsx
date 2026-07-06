import React from "react";
import toast from "react-hot-toast";
import { Copy, Share2, MessageCircle } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

function ProductShare() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Share2 size={18} className="text-neutral-700" />
        <h3 className="text-lg font-semibold text-neutral-900">
          Share Product
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:justify-center sm:gap-8">
        <button
          title="Copy Link"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied");
          }}
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-300 transition-all duration-300 group-hover:border-black group-hover:shadow-sm">
            <Copy size={20} />
          </div>

          <span className="text-xs text-neutral-500 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
            Copy
          </span>
        </button>

        <button
          title="WhatsApp"
          onClick={() =>
            window.open(
              `https://wa.me/?text=${encodeURIComponent(window.location.href)}`,
              "_blank",
            )
          }
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-green-200 text-green-600 transition-all duration-300 group-hover:bg-green-50 group-hover:shadow-sm">
            <MessageCircle size={20} />
          </div>

          <span className="text-xs text-neutral-500 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
            WhatsApp
          </span>
        </button>

        <button
          title="Share on X"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href,
              )}`,
              "_blank",
            )
          }
          className="group flex flex-col items-center gap-2"
        >
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:scale-105">
            <FaXTwitter size={18} />
          </div>

          <span className="text-xs text-neutral-500 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
            X
          </span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductShare);
