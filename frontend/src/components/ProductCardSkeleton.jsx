function ProductCardSkeleton() {
  return (
    <div className="animate-pulse border rounded-xl overflow-hidden">
      <div className="bg-gray-200 h-80"></div>

      <div className="p-4">
        <div className="bg-gray-200 h-3 w-20 mb-3 rounded"></div>
        <div className="bg-gray-200 h-5 w-full mb-2 rounded"></div>
        <div className="bg-gray-200 h-5 w-3/4 mb-4 rounded"></div>
        <div className="bg-gray-200 h-6 w-24 rounded"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
