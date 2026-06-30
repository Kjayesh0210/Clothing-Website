import React from "react";

function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <div className="h-[500px] rounded-3xl bg-neutral-200" />

          <div className="flex gap-3 mt-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-24 h-24 rounded-2xl bg-neutral-200" />
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div>
          {/* Category */}
          <div className="h-8 w-32 rounded-full bg-neutral-200 mb-6" />

          {/* Title */}
          <div className="h-12 w-4/5 rounded-xl bg-neutral-200 mb-6" />

          {/* Rating */}
          <div className="h-6 w-40 rounded-full bg-neutral-200 mb-8" />

          {/* Price */}
          <div className="flex gap-4 mb-8">
            <div className="h-10 w-32 rounded-xl bg-neutral-200" />
            <div className="h-10 w-24 rounded-xl bg-neutral-200" />
          </div>

          {/* Description */}
          <div className="space-y-3 mb-10">
            <div className="h-4 rounded-full bg-neutral-200" />
            <div className="h-4 rounded-full bg-neutral-200" />
            <div className="h-4 w-5/6 rounded-full bg-neutral-200" />
            <div className="h-4 w-4/6 rounded-full bg-neutral-200" />
          </div>

          {/* Sizes */}
          <div className="flex gap-3 mb-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-16 h-14 rounded-2xl bg-neutral-200" />
            ))}
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <div className="h-14 rounded-2xl bg-neutral-300" />
            <div className="h-14 rounded-2xl bg-neutral-200" />
          </div>

          {/* Share */}
          <div className="mt-10 rounded-3xl border border-neutral-200 p-6">
            <div className="h-6 w-36 rounded bg-neutral-200 mb-5" />

            <div className="flex gap-3">
              <div className="h-10 w-28 rounded-full bg-neutral-200" />
              <div className="h-10 w-28 rounded-full bg-neutral-200" />
              <div className="h-10 w-28 rounded-full bg-neutral-200" />
            </div>
          </div>

          {/* Review Form */}
          <div className="mt-10 rounded-3xl border border-neutral-200 p-8">
            <div className="h-8 w-48 rounded bg-neutral-200 mb-8" />

            <div className="h-14 rounded-2xl bg-neutral-200 mb-6" />

            <div className="h-40 rounded-2xl bg-neutral-200 mb-6" />

            <div className="h-14 rounded-2xl bg-neutral-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductDetailsSkeleton);
