import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";

function SearchBar({
  keyword,
  searchProducts,
  suggestions,
  setSuggestions,
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}

      <div
        className="
          flex
          h-11
          items-center
          rounded-full
          border
          border-neutral-200
          bg-neutral-50
          px-4
          transition-all
          duration-300
          focus-within:border-neutral-900
          focus-within:bg-white
        "
      >
        <Search size={18} className="text-neutral-400 h-5 w-10 rounded-xl" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => searchProducts(e.target.value)}
          placeholder="Search products..."
          className="
            ml-3
            flex-1
            bg-transparent
            text-[15px]
            text-neutral-900
            outline-none
            placeholder:text-neutral-400
          "
        />

        {keyword && (
          <button
            onClick={() => {
              searchProducts("");
              setSuggestions([]);
            }}
            className="
              rounded-full
              p-1
              h-6 w-6
            "
          >
            <X size={16} className="text-neutral-500" />
          </button>
        )}
      </div>

      {/* Suggestions */}

      {suggestions.length > 0 && (
        <div
          className="
            absolute
            left-0
            top-full
            z-50
            mt-3
            max-h-[420px]
            w-full
            overflow-y-auto
            rounded-2xl
            border
            border-neutral-200
            bg-white
            p-2
            shadow-xl
          "
        >
          {suggestions.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              onClick={() => {
                searchProducts("");
                setSuggestions([]);
              }}
              className="
                flex
                items-center
                gap-4
                rounded-xl
                p-3
                transition-all
                duration-200
                hover:bg-neutral-100
              "
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="
                  h-14
                  w-14
                  rounded-xl
                  object-cover
                "
              />

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-neutral-900
                  "
                >
                  {product.title}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))}

          <div className="mt-2 border-t border-neutral-100 pt-2">
            <button
              className="
                w-full
                rounded-xl
                py-3
                text-center
                text-sm
                font-medium
                text-neutral-600
                transition
                hover:bg-neutral-100
            "
            >
              View All Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
