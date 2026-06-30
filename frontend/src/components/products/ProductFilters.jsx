import React from "react";
import { X } from "lucide-react";
import FilterSection from "./FilterSection";

function ProductFilters({
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
      className="
    sticky
    top-24
    h-[calc(100vh-7rem)]
    bg-white
    shadow-[0_15px_50px_rgba(0,0,0,0.06)]
    overflow-hidden
    rounded-2xl
  "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          px-7
          py-6
          border-b
          border-neutral-200
          bg-neutral-50
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-neutral-900
            "
          >
            Filters
          </h2>
        </div>

        <button
          onClick={clearFilters}
          className="
            flex
            items-center
            gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            text-red-500
            hover:bg-red-50
            transition-all
            duration-300
          "
        >
          <X size={16} />
          Clear
        </button>
      </div>

      <div
        className="
    px-7
    py-6
    h-[calc(100%-88px)]
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-neutral-300
    scrollbar-track-transparent
  "
      >
        {/* CATEGORY */}

        <FilterSection title="Category">
          <div className="space-y-2">
            <button
              onClick={() => {
                setCategory("");
                setPage(1);
              }}
              className={itemClass(category === "")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>All Categories</span>
              </div>
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
                <div className="flex items-center gap-4">
                  <div className="w-6 flex-shrink-0" />
                  <span>{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* GENDER */}

        <FilterSection title="Gender">
          <div className="space-y-2">
            <button
              onClick={() => {
                setGender("");
                setPage(1);
              }}
              className={itemClass(gender === "")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>All</span>
              </div>
            </button>

            <button
              onClick={() => {
                setGender("Male");
                setPage(1);
              }}
              className={itemClass(gender === "Male")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Male</span>
              </div>
            </button>

            <button
              onClick={() => {
                setGender("Female");
                setPage(1);
              }}
              className={itemClass(gender === "Female")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Female</span>
              </div>
            </button>

            <button
              onClick={() => {
                setGender("Unisex");
                setPage(1);
              }}
              className={itemClass(gender === "Unisex")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Unisex</span>
              </div>
            </button>
          </div>
        </FilterSection>

        {/* PRICE */}

        <FilterSection title="Price">
          <div className="grid grid-cols-2 gap-4 px-4">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              className="
              h-8
              rounded-xl
              border
              border-neutral-300
              bg-neutral-50
              px-4
              text-base
              transition
              focus:bg-white
              focus:border-black
              focus:ring-2
              focus:ring-black/5
              focus:outline-none
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
              h-8
              rounded-xl
              border
              border-neutral-300
              bg-neutral-50
              px-4
              text-base
              transition
              focus:bg-white
              focus:border-black
              focus:ring-2
              focus:ring-black/5
              focus:outline-none
            "
            />
          </div>
        </FilterSection>

        {/* SORT */}

        <FilterSection title="Sort By">
          <div className="space-y-3">
            <button
              onClick={() => {
                setSort("");
                setPage(1);
              }}
              className={itemClass(sort === "")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Default</span>
              </div>
            </button>

            <button
              onClick={() => {
                setSort("newest");
                setPage(1);
              }}
              className={itemClass(sort === "newest")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Newest</span>
              </div>
            </button>

            <button
              onClick={() => {
                setSort("rating");
                setPage(1);
              }}
              className={itemClass(sort === "rating")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Best Rated</span>
              </div>
            </button>

            <button
              onClick={() => {
                setSort("price-low");
                setPage(1);
              }}
              className={itemClass(sort === "price-low")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Price: Low → High</span>
              </div>
            </button>

            <button
              onClick={() => {
                setSort("price-high");
                setPage(1);
              }}
              className={itemClass(sort === "price-high")}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span>Price: High → Low</span>
              </div>
            </button>
          </div>
        </FilterSection>

        {/* AVAILABILITY */}

        <FilterSection title="Availability">
          <button
            onClick={() => {
              setInStock(!inStock);
              setPage(1);
            }}
            className={`
      w-full
      px-6
      py-2.5
      rounded-xl
      transition-all
      duration-200
      ${
        inStock
          ? "bg-neutral-200 text-neutral-900"
          : "text-neutral-700 hover:bg-neutral-100"
      }
    `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-6 flex-shrink-0" />
                <span className="text-base font-medium">In Stock Only</span>
              </div>

              <div
                className={`
          w-5
          h-5
          rounded-md
          border
          flex
          items-center
          justify-center
          transition-all
          ${
            inStock
              ? "border-neutral-700 bg-neutral-700 text-white"
              : "border-neutral-400"
          }
        `}
              >
                {inStock && <span className="text-[11px] font-bold">✓</span>}
              </div>
            </div>
          </button>
        </FilterSection>
      </div>
    </aside>
  );
}

export default React.memo(ProductFilters);
