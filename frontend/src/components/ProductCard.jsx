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
      bg-white
      rounded-2xl
      overflow-hidden
      border
      border-gray-100
      shadow-none
      hover:border-white
      hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        {product.discountPercentage > 0 && (
          <span
            className="
            absolute
            top-4
            left-4
            z-10
            rounded-full
            bg-red-600
            text-white
            text-xs
            font-semibold
            px-3
            py-1
            shadow
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
          w-full
          aspect-[3/4]
          object-cover
          group-hover:scale-105
          transition-transform
          duration-500
          "
        />
        <div
          className="
          absolute
          inset-x-0
          bottom-0
          h-24
          bg-gradient-to-t
          from-black/20
          to-transparent
          pointer-events-none
        "
        />
        {product.rating > 0 && (
          <div className="absolute bottom-4 left-4">
            <span
              className="
              inline-flex
              items-center
              gap-1
              backdrop-blur-sm
              bg-white/90
              shadow-md
              rounded-full
              px-3.5
              py-1.5
              text-sm
              font-semibold
              text-gray-800
              "
            >
              ⭐ {product.rating.toFixed(1)}
            </span>
          </div>
        )}
        <div className="absolute bottom-4 right-4 z-10">
          {inStock ? (
            totalStock <= 5 ? (
              <span className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-semibold shadow">
                {totalStock} Left
              </span>
            ) : (
              <span className="bg-green-100 text-green-700 px-3 py-1 text-base font-semibold shadow">
                In Stock
              </span>
            )
          ) : (
            <span className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs font-semibold shadow">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <span
          className="
          inline-block
          rounded-md
          bg-gray-50
          px-2.5
          py-1
          text-xs
          font-semibold
          text-gray-600
          mb-3
        "
        >
          {product.category?.name}
        </span>

        <h3
          className="
          text-lg
          font-semibold
          leading-6
          text-gray-900
          line-clamp-2
          min-h-[56px]
          mb-3
          "
        >
          {product.title}
        </h3>

        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>

              <span className="text-sm font-bold text-green-700">
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
