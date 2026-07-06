import React from "react";
import { CheckCircle2, CircleX, Star } from "lucide-react";
function ProductInfo({ product, selectedSize, setSelectedSize }) {
  const inStock = product.sizes?.some((s) => s.stock > 0);

  return (
    <>
      {/* Brand */}
      <p className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-500">
        THREADDOT
      </p>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl lg:text-4xl">
        {product.title}
      </h1>

      {/* Price */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span className="text-lg text-neutral-400 line-through sm:text-2xl">
                ₹{product.originalPrice}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-neutral-500">Inclusive of all taxes</p>
      </div>

      {/* Rating + Stock */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700">
          <Star size={18} className="fill-yellow-500 text-yellow-500" />

          <span>{product.rating}</span>

          <span className="text-neutral-600">
            ({product.numReviews} Reviews)
          </span>
        </div>

        {inStock ? (
          <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
            <CheckCircle2 size={18} />
            In Stock
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            <CircleX size={18} />
            Out of Stock
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium">
          {product.category?.name || product.category}
        </span>

        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium">
          {product.gender}
        </span>

        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium">
          Premium Quality
        </span>
      </div>

      <div className="h-px bg-neutral-200" />

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold sm:text-xl">Select Size</h3>

            <button className="text-sm font-medium text-blue-600 hover:underline">
              Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((item) => (
              <button
                key={item.size}
                disabled={item.stock === 0}
                onClick={() => setSelectedSize(item.size)}
                className={`
                h-12
                w-12
                rounded-xl
                border
                text-sm
                font-semibold
                transition

                sm:h-14
                sm:w-14
                sm:text-base

                ${
                  selectedSize === item.size
                    ? "border-black bg-black text-white"
                    : "border-neutral-300 bg-white hover:border-black"
                }

                ${item.stock === 0 ? "cursor-not-allowed opacity-40" : ""}
              `}
              >
                {item.size}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="h-px bg-neutral-200" />

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl">
          Description
        </h3>

        <p className="leading-7 text-neutral-600 sm:leading-8">
          {product.description}
        </p>
      </div>
    </>
  );
}

export default React.memo(ProductInfo);
