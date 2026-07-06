import { Minus, Plus, Trash2, PackageCheck } from "lucide-react";

function CartItem({ item, updateQuantity, removeItem }) {
  const image =
    item.product.images?.[0] || "https://placehold.co/600x800?text=No+Image";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 sm:p-5">
      <div className="flex flex-row-reverse gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <div className="shrink-0">
          <img
            src={image}
            alt={item.product.title}
            className="h-32 w-24 rounded-xl bg-neutral-100 object-cover sm:h-44 sm:w-36"
          />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:text-xs">
              THREADDOT
            </p>

            <h2 className="mt-1 text-base font-semibold leading-tight text-neutral-900 sm:text-xl">
              {item.product.title}
            </h2>

            <p className="mt-2 text-2xl font-bold sm:text-3xl">
              ₹{item.product.price}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium sm:px-4 sm:py-1.5 sm:text-sm">
                Size {item.size}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 sm:px-4 sm:py-1.5 sm:text-sm">
                <PackageCheck size={14} />
                In Stock
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-3 sm:mt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-fit items-center overflow-hidden rounded-xl border border-neutral-200">
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1, item.size)
                }
                className="p-2.5 transition hover:bg-neutral-100 sm:p-3"
              >
                <Minus size={16} />
              </button>

              <div className="flex w-10 justify-center text-base font-semibold sm:w-12 sm:text-lg">
                {item.quantity}
              </div>

              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1, item.size)
                }
                className="p-2.5 transition hover:bg-neutral-100 sm:p-3"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.product._id, item.size)}
              className="flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
