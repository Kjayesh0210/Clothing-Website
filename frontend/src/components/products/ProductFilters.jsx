import React from "react";
import { X } from "lucide-react";
import FilterSection from "./FilterSection";

function ProductFilters({
  mobile = false,
  category,
  setCategory,
  categories,
  gender,
  setGender,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  inStock,
  setInStock,
  setPage,
}) {
  const clearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setGender("");
    setSort("");
    setInStock(false);
    setPage(1);
  };

  const itemClass = (active) => `
  w-[88%]
  ml-3
  text-left
  px-4
  py-2.5
  rounded-full
  text-base
  font-medium
  transition-all
  duration-200
  ${
    active
      ? "bg-neutral-300 text-neutral-900"
      : "text-neutral-700 hover:bg-neutral-100"
  }
`;

  return (
    <aside
      className={`
    flex
    flex-col
    ${
      mobile
        ? "bg-white"
        : "rounded-2xl border border-neutral-200 bg-neutral-50"
    }
  `}
    >
      {!mobile && (
        <div
          className="
          flex
          items-center
          justify-between
          border-b
          border-neutral-200
          px-5
          py-4
          shrink-0
        "
        >
          <h2 className="text-xl font-bold text-neutral-900">Filters</h2>

          <button
            onClick={clearFilters}
            className="
            flex
            items-center
            gap-2
            rounded-full
            px-3
            py-2
            text-sm
            font-medium
            text-red-500
            transition-colors
            hover:bg-red-50
          "
          >
            <X size={16} />
            Clear
          </button>
        </div>
      )}

      <div className="flex-1">
        <div
          className={`
          space-y-2
          ${mobile ? "" : "px-5 py-5"}
        `}
        >
          <FilterSection title="Category">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCategory("");
                  setPage(1);
                }}
                className={itemClass(category === "")}
              >
                <span>All Categories</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => {
                    setCategory(cat._id);
                    setPage(1);
                  }}
                  className={itemClass(category === cat._id)}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Gender">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setGender("");
                  setPage(1);
                }}
                className={itemClass(gender === "")}
              >
                <span>All</span>
              </button>

              <button
                onClick={() => {
                  setGender("Male");
                  setPage(1);
                }}
                className={itemClass(gender === "Male")}
              >
                <span>Male</span>
              </button>

              <button
                onClick={() => {
                  setGender("Female");
                  setPage(1);
                }}
                className={itemClass(gender === "Female")}
              >
                <span>Female</span>
              </button>

              <button
                onClick={() => {
                  setGender("Unisex");
                  setPage(1);
                }}
                className={itemClass(gender === "Unisex")}
              >
                <span>Unisex</span>
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Price">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
                className="
                h-10
                rounded-xl
                border
                border-neutral-300
                bg-neutral-50
                px-3
                text-sm
                transition-colors
                focus:border-black
                focus:bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-black/5
              "
              />

              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
                className="
                h-10
                rounded-xl
                border
                border-neutral-300
                bg-neutral-50
                px-3
                text-sm
                transition-colors
                focus:border-black
                focus:bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-black/5
              "
              />
            </div>
          </FilterSection>

          <FilterSection title="Sort By">
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSort("");
                  setPage(1);
                }}
                className={itemClass(sort === "")}
              >
                <span>Default</span>
              </button>

              <button
                onClick={() => {
                  setSort("newest");
                  setPage(1);
                }}
                className={itemClass(sort === "newest")}
              >
                <span>Newest</span>
              </button>

              <button
                onClick={() => {
                  setSort("rating");
                  setPage(1);
                }}
                className={itemClass(sort === "rating")}
              >
                <span>Best Rated</span>
              </button>

              <button
                onClick={() => {
                  setSort("price-low");
                  setPage(1);
                }}
                className={itemClass(sort === "price-low")}
              >
                <span>Price: Low → High</span>
              </button>

              <button
                onClick={() => {
                  setSort("price-high");
                  setPage(1);
                }}
                className={itemClass(sort === "price-high")}
              >
                <span>Price: High → Low</span>
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Availability">
            <button
              onClick={() => {
                setInStock(!inStock);
                setPage(1);
              }}
              className={`
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              px-4
              py-2
              transition-colors
              ${
                inStock
                  ? "bg-neutral-200 text-neutral-900"
                  : "text-neutral-700 hover:bg-neutral-100"
              }
            `}
            >
              <span className="text-sm font-medium">In Stock Only</span>

              <div
                className={`
                flex
                size-5
                items-center
                justify-center
                rounded-md
                border
                transition-colors
                ${
                  inStock
                    ? "border-neutral-700 bg-neutral-700 text-white"
                    : "border-neutral-400"
                }
              `}
              >
                {inStock && <span className="text-[11px] font-bold">✓</span>}
              </div>
            </button>
          </FilterSection>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(ProductFilters);
