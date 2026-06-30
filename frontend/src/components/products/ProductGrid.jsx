import React from "react";
import ProductCard from "../ProductCard";
import ProductSkeleton from "./ProductSkeleton";

function ProductGrid({ loading, products }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h3 className="text-2xl font-semibold text-gray-700">
          No products found
        </h3>

        <p className="text-gray-500 mt-2">
          Try changing your filters or search keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default React.memo(ProductGrid);
