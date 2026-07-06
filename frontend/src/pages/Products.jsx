import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/products/ProductGrid";
import ProductHeader from "../components/products/ProductHeader";
import ProductPagination from "../components/products/ProductPagination";
import ProductFilters from "../components/products/ProductFilters";
import SearchBar from "../components/layout/navbar/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [inStock, setInStock] = useState(
    searchParams.get("inStock") === "true",
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setKeyword(searchParams.get("keyword") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "");
    setGender(searchParams.get("gender") || "");
    setInStock(searchParams.get("inStock") === "true");
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, keyword, minPrice, maxPrice, sort, inStock, gender, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = {};

    if (category) params.category = category;
    if (keyword) params.keyword = keyword;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;
    if (gender) params.gender = gender;
    if (inStock) params.inStock = "true";
    if (page > 1) params.page = String(page);

    setSearchParams(params);
  }, [
    category,
    keyword,
    minPrice,
    maxPrice,
    sort,
    gender,
    inStock,
    page,
    setSearchParams,
  ]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-[1500px] px-2 py-6 sm:px-6 lg:py-8">
        <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Filter Sidebar */}
          <div className="sticky top-24 hidden self-start lg:block">
            <ProductFilters
              category={category}
              setCategory={setCategory}
              categories={categories}
              gender={gender}
              setGender={setGender}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sort={sort}
              setSort={setSort}
              inStock={inStock}
              setInStock={setInStock}
              setPage={setPage}
            />
          </div>

          {/* Products */}
          <div className="min-w-0 w-full space-y-6">
            <div className="flex items-center gap-3 lg:hidden">
              <SearchBar
                className="flex-1"
                keyword={keyword}
                searchProducts={setKeyword}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
              />

              <button
                onClick={() => setShowFilters(true)}
                className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200
                bg-neutral-50
                transition-colors
                hover:bg-neutral-100
              "
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
            <ProductHeader loading={loading} products={products} />
            <ProductGrid loading={loading} products={products} />
          </div>
        </div>
        <ProductPagination
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
      {/* Mobile Filter Drawer */}
      <div
        className={`
        fixed
        inset-0
        z-50
        bg-black/40
        transition-opacity
        duration-300
        lg:hidden
        ${showFilters ? "visible opacity-100" : "invisible opacity-0"}
      `}
        onClick={() => setShowFilters(false)}
      >
        <div
          className={`
          absolute
          right-0
          top-0
          h-full
          w-full
          max-w-sm
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ${showFilters ? "translate-x-0" : "translate-x-full"}
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold text-neutral-900">
                Filters
              </h2>

              <button
                onClick={() => {
                  setCategory("");
                  setMinPrice("");
                  setMaxPrice("");
                  setGender("");
                  setSort("");
                  setInStock(false);
                  setPage(1);
                }}
                className="text-sm font-medium text-red-500"
              >
                Reset
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <ProductFilters
                mobile
                category={category}
                setCategory={setCategory}
                categories={categories}
                gender={gender}
                setGender={setGender}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                inStock={inStock}
                setInStock={setInStock}
                setPage={setPage}
              />
              <div className="border-t border-neutral-200 bg-white p-4">
                <button
                  onClick={() => setShowFilters(false)}
                  className="
                  h-12
                  w-full
                  rounded-xl
                  bg-black
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-neutral-800
                "
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
