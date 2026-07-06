import React from "react";

function ProductGallery({ product, selectedImage, setSelectedImage }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
      {/* Thumbnails */}
      <div
        className="
    order-2
    flex
    flex-wrap
    justify-center
    gap-3
    lg:order-1
    lg:flex-col
    lg:justify-start
  "
      >
        {product.images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
        overflow-hidden
        rounded-xl
        border-2
        transition-all
        duration-300
        ${
          selectedImage === image
            ? "scale-105 border-black shadow-md"
            : "border-neutral-200 hover:border-black hover:shadow-sm"
        }
      `}
          >
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              loading="lazy"
              className="h-16 w-16 object-cover sm:h-20 sm:w-20 lg:h-24 lg:w-24"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative order-1 flex-1 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 lg:order-2">
        <img
          src={selectedImage || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="h-[380px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[480px] lg:h-[550px]"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-bold tracking-wider text-white shadow-lg">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ProductGallery);
