import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

function ProductActions({
  product,
  cartLoading,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
}) {
  const inStock = product.sizes?.some((s) => s.stock > 0);

  return (
    <div className="space-y-3 sm:space-y-4">
      {inStock ? (
        <button
          disabled={cartLoading}
          onClick={addToCart}
          className="
          flex
          h-12
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-black
          px-6
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-neutral-800
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:h-14
          sm:gap-3
          sm:text-base
        "
        >
          <ShoppingBag className="h-5 w-5" />

          {cartLoading ? "Adding..." : "Add To Bag"}
        </button>
      ) : (
        <button
          disabled
          className="
          h-12
          w-full
          rounded-xl
          bg-neutral-300
          text-sm
          font-semibold
          text-neutral-600
          cursor-not-allowed
          sm:h-14
          sm:text-base
        "
        >
          Out Of Stock
        </button>
      )}

      <button
        onClick={isInWishlist ? removeFromWishlist : addToWishlist}
        className="
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-neutral-300
        bg-white
        px-6
        text-sm
        font-semibold
        text-neutral-900
        transition
        hover:border-black
        hover:bg-neutral-50
        active:scale-[0.98]
        sm:h-14
        sm:gap-3
        sm:text-base
      "
      >
        <Heart
          className={`h-5 w-5 ${
            isInWishlist ? "fill-red-500 text-red-500" : ""
          }`}
        />
        {isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}
      </button>
    </div>
  );
}

export default React.memo(ProductActions);
