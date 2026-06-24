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
      border
      rounded-xl
      overflow-hidden
      bg-white
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >
      <div className="overflow-hidden relative">
        {product.discountPercentage > 0 && (
          <span
            className="
            absolute
            top-3
            left-3
            bg-red-500
            text-white
            text-xs
            font-semibold
            px-2
            py-1
            rounded
            z-10
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
          h-80
          object-cover
          group-hover:scale-105
          transition
          duration-500
          "
        />
      </div>

      <div className="p-4">
        <p
          className="
          text-xs
          uppercase
          tracking-wider
          text-gray-500
          mb-2
          "
        >
          {product.category?.name}
        </p>

        <h3
          className="
          font-semibold
          text-lg
          mb-3
          line-clamp-2
          min-h-[56px]
          "
        >
          {product.title}
        </h3>

        <div className="mb-3">
          <span
            className="
            text-2xl
            font-bold
            "
          >
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span
                className="
                line-through
                text-gray-400
                ml-2
                "
              >
                ₹{product.originalPrice}
              </span>

              <span
                className="
                text-green-600
                ml-2
                text-sm
                font-medium
                "
              >
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        <div className="mb-4">
          {inStock ? (
            totalStock <= 5 ? (
              <span
                className="
                text-orange-500
                text-sm
                font-medium
                "
              >
                Only {totalStock} left
              </span>
            ) : (
              <span
                className="
                text-green-600
                text-sm
                font-medium
                "
              >
                ✓ In Stock
              </span>
            )
          ) : (
            <span
              className="
              text-red-500
              text-sm
              font-medium
              "
            >
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default React.memo(ProductCard);
