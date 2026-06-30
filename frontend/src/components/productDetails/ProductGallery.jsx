import React from "react";

function ProductGallery({ product, selectedImage, setSelectedImage }) {
  return (
    <div>
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-neutral-200
          bg-neutral-100
        "
      >
        <img
          loading="lazy"
          src={selectedImage || "https://via.placeholder.com/700"}
          alt={product.title}
          className="
            w-full
            h-[650px]
            object-cover
            transition-transform
            duration-700
            hover:scale-105
          "
        />

        {product.discountPercentage > 0 && (
          <div
            className="
              absolute
              left-6
              top-6
              rounded-full
              bg-red-500
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
          >
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        {product.images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
              overflow-hidden
              rounded-2xl
              border-2
              transition-all
              duration-300
              ${
                selectedImage === image
                  ? "border-black scale-105"
                  : "border-neutral-200 hover:border-black"
              }
            `}
          >
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              loading="lazy"
              className="
                w-24
                h-24
                object-cover
              "
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(ProductGallery);
