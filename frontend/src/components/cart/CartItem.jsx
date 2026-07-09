import { Minus, Plus, Trash2, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CartItem({ item, updateQuantity, removeItem, addToWishlist }) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [moveToWishlist, setMoveToWishlist] = useState(false);
  const image =
    item.product.images?.[0] || "https://placehold.co/600x800?text=No+Image";

  const confirmRemove = async () => {
    try {
      if (moveToWishlist) {
        await addToWishlist(selectedItem.product._id);
      }

      await removeItem(selectedItem.product._id, selectedItem.size);

      setShowRemoveModal(false);
      setSelectedItem(null);
      setMoveToWishlist(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 sm:p-5">
      <div className="flex flex-row-reverse gap-4 sm:flex-row sm:gap-6">
        {/* Image */}
        <div className="shrink-0">
          <Link to={`/products/${item.product._id}`}>
            <img
              src={image}
              alt={item.product.title}
              className="h-32 w-24 rounded-xl bg-neutral-100 object-cover sm:h-44 sm:w-36"
            />
          </Link>
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:text-xs">
              THREADDOT
            </p>

            <Link to={`/products/${item.product._id}`}>
              <h2 className="mt-1 text-base font-semibold leading-tight text-neutral-900 sm:text-xl">
                {item.product.title}
              </h2>
            </Link>

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
              onClick={() => {
                setSelectedItem(item);
                setMoveToWishlist(false);
                setShowRemoveModal(true);
              }}
              className="flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-600"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </div>
          {showRemoveModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Remove from Cart?
                </h2>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Are you sure you want to remove this item from your shopping
                  bag?
                </p>

                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                  <img
                    src={selectedItem?.product.images?.[0]}
                    alt={selectedItem?.product.title}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-neutral-900">
                      {selectedItem?.product.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      Size {selectedItem?.size}
                    </p>

                    <p className="font-semibold text-neutral-900">
                      ₹{selectedItem?.product.price}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShowRemoveModal(false)}
                    className="rounded-xl border border-neutral-300 py-3 font-medium transition hover:bg-neutral-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      await addToWishlist(selectedItem.product._id);
                      await removeItem(
                        selectedItem.product._id,
                        selectedItem.size,
                      );

                      setShowRemoveModal(false);
                      setSelectedItem(null);
                    }}
                    className="rounded-xl border border-pink-200 bg-pink-50 py-3 font-medium text-pink-600 transition hover:bg-pink-100"
                  >
                    ❤️ Wishlist
                  </button>

                  <button
                    onClick={async () => {
                      await removeItem(
                        selectedItem.product._id,
                        selectedItem.size,
                      );

                      setShowRemoveModal(false);
                      setSelectedItem(null);
                    }}
                    className="rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
