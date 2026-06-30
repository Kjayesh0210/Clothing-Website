import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

function ProductActions({ product, cartLoading, addToCart, addToWishlist }) {
  const inStock = product.sizes?.some((s) => s.stock > 0);

  return (
    <div className="mt-10 space-y-4">
      {inStock ? (
        <button
          disabled={cartLoading}
          onClick={addToCart}
          className="
            w-full
            h-14
            rounded-xl
            bg-black
            text-white
            font-semibold
            text-base
            flex
            items-center
            justify-center
            gap-3
            transition-all
            duration-300
            hover:bg-neutral-800
            hover:-translate-y-0.5
            active:scale-[0.98]
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          <ShoppingBag size={20} />

          {cartLoading ? "Adding..." : "Add To Bag"}
        </button>
      ) : (
        <button
          disabled
          className="
            w-full
            h-14
            rounded-xl
            bg-neutral-300
            text-neutral-600
            font-semibold
            cursor-not-allowed
          "
        >
          Out Of Stock
        </button>
      )}
      <div className="h-4" />
      <button
        onClick={addToWishlist}
        className="
          w-full
          h-14
          rounded-xl
          border-2
          border-neutral-300
          bg-white
          text-neutral-900
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          transition-all
          duration-300
          hover:border-black
          hover:bg-neutral-50
        "
      >
        <Heart size={20} />
        Add To Wishlist
      </button>
    </div>
  );
}

export default React.memo(ProductActions);
