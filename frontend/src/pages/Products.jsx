import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [inStock, setInStock] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const [gender, setGender] = useState(searchParams.get("gender") || "");

  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const genderParam = searchParams.get("gender");

  //   if (genderParam) {
  //     setGender(genderParam);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, keyword, minPrice, maxPrice, sort, inStock, gender, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?category=${category}&keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&inStock=${inStock}&sort=${sort}&gender=${gender}&page=${page}`,
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* FILTER SIDEBAR */}
          <div
            className="
        border
        rounded-xl
        p-5
        h-fit
        sticky
        top-24
        bg-white
        "
          >
            <h2 className="text-2xl font-semibold mb-5">Filters</h2>

            <div className="space-y-4">
              <input
                placeholder="Search Products"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            border
            rounded-lg
            p-3
            "
              />

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="
  w-full
  border
  rounded-lg
  p-3
  "
              >
                <option value="">All Categories</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            border
            rounded-lg
            p-3
            "
              >
                <option value="">All Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            border
            rounded-lg
            p-3
            "
              />

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            border
            rounded-lg
            p-3
            "
              />

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="
            w-full
            border
            rounded-lg
            p-3
            "
              >
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price Low → High</option>
                <option value="price-high">Price High → Low</option>
                <option value="rating">Best Rated</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setPage(1);
                  }}
                />
                In Stock Only
              </label>

              <button
                onClick={() => {
                  setCategory("");
                  setKeyword("");
                  setMinPrice("");
                  setMaxPrice("");
                  setGender("");
                  setSort("");
                  setInStock(false);
                  setPage(1);
                }}
                className="
            w-full
            bg-black
            text-white
            py-3
            rounded-lg
            hover:bg-gray-800
            transition
            "
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Products</h1>

                <p className="text-gray-500 text-sm mt-1">
                  Discover our latest collection
                </p>
              </div>

              <span className="text-gray-500">
                {loading ? "Loading..." : `${products.length} Products`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {loading ? (
                [...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="
        animate-pulse
        border
        rounded-xl
        overflow-hidden
        bg-white
        "
                  >
                    <div className="h-80 bg-gray-200"></div>

                    <div className="p-4">
                      <div className="h-3 bg-gray-200 rounded w-20 mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
            {!loading && (
              <div
                className="
        flex
        justify-center
        items-center
        gap-2
        mt-10
        "
              >
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
          border
          px-4
          py-2
          "
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`
              px-4
              py-2
              border
              ${page === index + 1 ? "bg-black text-white" : ""}
              `}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="
          border
          px-4
          py-2
          "
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
