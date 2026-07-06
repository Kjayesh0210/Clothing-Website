import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const totalStock =
    product.sizes?.reduce((sum, item) => sum + item.stock, 0) || 0;

  const inStock = product.sizes?.some((item) => item.stock > 0) || false;

  return (
    <Link
      to={`/products/${product._id}`}
      className="
      group
      overflow-hidden
      rounded-2xl
      border
      border-neutral-200
      bg-white
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-neutral-300
      hover:shadow-lg
    "
    >
      <div className="relative overflow-hidden">
        {product.discountPercentage > 0 && (
          <span
            className="
            absolute
            left-3
            top-3
            z-10
            rounded-full
            bg-red-600
            px-3
            py-1
            text-xs
            font-semibold
            text-white
          "
          >
            {product.discountPercentage}% OFF
          </span>
        )}

        <img
          src={product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="
          aspect-[3/4]
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
        />

        {product.rating > 0 && (
          <span
            className="
            absolute
            bottom-3
            left-3
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-white/90
            px-3
            py-1
            text-xs
            font-semibold
            text-neutral-800
            backdrop-blur
          "
          >
            ⭐ {product.rating.toFixed(1)}
          </span>
        )}

        <div className="absolute bottom-3 right-3">
          {inStock ? (
            totalStock <= 5 ? (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                {totalStock} Left
              </span>
            ) : (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                In Stock
              </span>
            )
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 p-2">
        <span
          className="
          inline-block
          rounded-md
          bg-neutral-100
          px-2.5
          text-xs
          font-medium
          text-neutral-600
        "
        >
          {product.category?.name}
        </span>

        <h3
          className="
          line-clamp-2
          text-base
          font-semibold
          leading-6
          text-neutral-900
          sm:text-lg
        "
        >
          {product.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-bold text-neutral-900 sm:text-2xl">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-neutral-400 line-through">
                ₹{product.originalPrice}
              </span>

              <span className="text-sm font-semibold text-green-600">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
