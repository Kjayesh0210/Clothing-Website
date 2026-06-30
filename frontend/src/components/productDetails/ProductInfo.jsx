import React from "react";

function ProductInfo({ product, selectedSize, setSelectedSize }) {
  const inStock = product.sizes?.some((s) => s.stock > 0);

  return (
    <>
      {/* Brand */}

      <p className="text-2xl font-bold text-neutral-900">
        {product.brand || "Clothify"}
      </p>

      {/* Title */}

      <h1 className="mt-3 text-3xl font-medium leading-snug text-neutral-700">
        {product.title}
      </h1>

      {/* Rating */}

      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white">
            ★ {product.rating}
          </span>

          <span className="text-neutral-500">{product.numReviews} Reviews</span>
        </div>

        {inStock ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            In Stock
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
            Out of Stock
          </span>
        )}
      </div>

      {/* Price */}

      <div className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl font-bold text-neutral-900">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <>
              <span className="text-2xl text-neutral-400 line-through">
                ₹{product.originalPrice}
              </span>

              <span className="font-semibold text-green-600">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        <p className="mt-2 text-sm text-neutral-500">Inclusive of all taxes</p>
      </div>

      {/* Product Tags */}

      <div className="mt-10 flex flex-wrap gap-3">
        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-6 py-2 text-sm font-medium">
          {product.category?.name || product.category}
        </span>

        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium">
          {product.gender}
        </span>

        <span className="rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium">
          Premium Quality
        </span>
      </div>

      {/* Divider */}

      <div className="my-10 h-px bg-neutral-200" />

      {/* Size */}

      {product.sizes?.length > 0 && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-neutral-900">
              Select Size
            </h3>

            <button className="text-sm font-medium text-blue-600 hover:underline">
              Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-5">
            {product.sizes.map((item) => (
              <button
                key={item.size}
                disabled={item.stock === 0}
                onClick={() => setSelectedSize(item.size)}
                className={`
                  relative
                  h-14
                  w-14
                  rounded-xl
                  border
                  text-base
                  font-semibold
                  transition-all
                  duration-200

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

      {/* Divider */}

      <div className="my-10 h-px bg-neutral-200" />

      {/* Description */}

      <div>
        <h3 className="mb-5 text-xl font-semibold text-neutral-900">
          Description
        </h3>

        <p className="leading-9 text-neutral-600">{product.description}</p>
      </div>
    </>
  );
}

export default React.memo(ProductInfo);
