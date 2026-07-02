import React from "react";

function ProductGallery({ product, selectedImage, setSelectedImage }) {
  return (
    <div className="flex items-start gap-6">
      {/* Thumbnails */}

      <div className="flex flex-col gap-4">
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
              className="h-24 w-24 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}

      <div
        className="
          relative
          flex-1
          overflow-hidden
          rounded-3xl
          border
          border-neutral-200
          bg-neutral-100
        "
      >
        <img
          loading="lazy"
          src={selectedImage || product.images?.[0]}
          alt={product.title}
          className="
            h-[550px]
            w-full
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
          left-5
          top-5
          inline-flex
          h-6
          w-18
          items-center
          justify-center
          rounded-full
          bg-[#E53935]
          text-xs
          font-bold
          uppercase
          tracking-[0.15em]
          text-white
          shadow-lg
        "
          >
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>
      
    </div>
  );
}

export default React.memo(ProductGallery);
