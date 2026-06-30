import { Minus, Plus, Trash2, PackageCheck } from "lucide-react";

function CartItem({ item, updateQuantity, removeItem }) {
  const image =
    item.product.images?.[0] || "https://placehold.co/600x800?text=No+Image";

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-neutral-200
        p-5
        transition-all
        duration-300]
      "
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex justify-center sm:block">
          <img
            src={image}
            alt={item.product.title}
            className="
              w-36
              h-44
              rounded-xl
              object-cover
              bg-neutral-100
            "
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              THREADDOT
            </p>

            <h2 className="mt-1 text-xl font-semibold text-neutral-900">
              {item.product.title}
            </h2>

            <p className="mt-3 text-3xl font-bold">₹{item.product.price}</p>

            <div className="mt-4 flex flex-wrap gap-3">
              <span
                className="
                  px-4
                  py-1.5
                  rounded-full
                  bg-neutral-100
                  text-sm
                  font-medium
                "
              >
                Size {item.size}
              </span>

              <span
                className="
                  flex
                  items-center
                  gap-1
                  px-4
                  py-1.5
                  rounded-full
                  bg-green-50
                  text-green-700
                  text-sm
                  font-medium
                "
              >
                <PackageCheck size={16} />
                In Stock
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <div
              className="
                flex
                items-center
                border
                rounded-xl
                overflow-hidden
              "
            >
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1, item.size)
                }
                className="
                  p-3
                  hover:bg-neutral-100
                  transition
                "
              >
                <Minus size={18} />
              </button>

              <div
                className="
                  w-14
                  text-center
                  font-semibold
                  text-lg
                "
              >
                {item.quantity}
              </div>

              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1, item.size)
                }
                className="
                  p-3
                  hover:bg-neutral-100
                  transition
                "
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.product._id, item.size)}
              className="
                flex
                items-center
                gap-2
                text-red-500
                hover:text-red-600
                font-medium
                transition
              "
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
