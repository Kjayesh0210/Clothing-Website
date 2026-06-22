import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="
      group
      border
      rounded-lg
      overflow-hidden
      bg-white
      hover:shadow-xl
      transition
      duration-300
      "
    >
      <div className="overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="
          w-full
          h-80
          object-cover
          group-hover:scale-105
          transition
          duration-500
          "
        />
      </div>

      <div className="p-4">
        <p
          className="
          text-sm
          text-gray-500
          mb-2
          "
        >
          {product.category}
        </p>

        <h3
          className="
          font-semibold
          text-lg
          mb-2
          line-clamp-2
          "
        >
          {product.title}
        </h3>

        <div
          className="
          flex
          justify-between
          items-center
          "
        >
          <span
            className="
            text-xl
            font-bold
            "
          >
            <div>
              <span
                className="
    text-xl
    font-bold
    "
              >
                ₹{product.price}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span
                    className="
        line-through
        text-gray-500
        ml-2
        "
                  >
                    ₹{product.originalPrice}
                  </span>

                  <span
                    className="
        text-green-600
        ml-2
        "
                  >
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </span>

          {product.stock > 5 ? (
            <span
              className="
    text-green-600
    text-sm
    "
            >
              In Stock
            </span>
          ) : product.stock > 0 ? (
            <span
              className="
    text-orange-500
    text-sm
    "
            >
              Only {product.stock} left
            </span>
          ) : (
            <span
              className="
    text-red-500
    text-sm
    "
            >
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
