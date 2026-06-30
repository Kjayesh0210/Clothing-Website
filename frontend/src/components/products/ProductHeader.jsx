import React from "react";

function ProductHeader({ loading, products }) {
  return (
    <div className="mt-6 mb-8">
      <div className="flex items-end justify-between py-4">
        <div>
          <h1 className="my-5 text-4xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Discover our latest collection curated for every style.
          </p>
        </div>

        <div
          className="
          hidden
          sm:flex
          items-center
          bg-gray-50
          px-4
          py-2
          "
        >
          <span className="text-sm font-semibold text-gray-700">
            {loading ? "Loading..." : `${products.length} Products`}
          </span>
        </div>
      </div>

      <div className="mt-6 h-px bg-gray-200" />
    </div>
  );
}

export default React.memo(ProductHeader);
