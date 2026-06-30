import React from "react";

function ProductSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-neutral-200
        bg-white
        shadow-sm
        animate-pulse
      "
    >
      {/* Image */}

      <div className="relative">
        <div
          className="
            h-80
            bg-gradient-to-br
            from-neutral-200
            via-neutral-100
            to-neutral-200
          "
        />

        {/* Wishlist Button */}

        <div
          className="
            absolute
            top-4
            right-4
            h-10
            w-10
            rounded-full
            bg-white/80
          "
        />

        {/* Badge */}

        <div
          className="
            absolute
            left-4
            top-4
            h-7
            w-20
            rounded-full
            bg-white/80
          "
        />
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Category */}

        <div
          className="
            h-3
            w-24
            rounded-full
            bg-neutral-200
            mb-5
          "
        />

        {/* Title */}

        <div
          className="
            h-5
            w-full
            rounded-full
            bg-neutral-200
            mb-3
          "
        />

        <div
          className="
            h-5
            w-2/3
            rounded-full
            bg-neutral-200
            mb-6
          "
        />

        {/* Rating */}

        <div className="flex gap-2 mb-6">
          <div className="h-4 w-16 rounded-full bg-neutral-200" />

          <div className="h-4 w-10 rounded-full bg-neutral-200" />
        </div>

        {/* Price */}

        <div className="flex items-end gap-3 mb-6">
          <div className="h-7 w-24 rounded-full bg-neutral-300" />

          <div className="h-4 w-14 rounded-full bg-neutral-200" />
        </div>

        {/* Buttons */}

        <div className="flex gap-3">
          <div
            className="
              h-12
              flex-1
              rounded-2xl
              bg-neutral-300
            "
          />

          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-neutral-200
            "
          />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
