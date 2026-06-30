import { X } from "lucide-react";
import clsx from "clsx";

function Modal({ open, onClose, title, children, className = "" }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "w-full max-w-lg rounded-2xl bg-white shadow-xl",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
