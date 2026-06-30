import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/products/ProductGrid";
import ProductHeader from "../components/products/ProductHeader";
import ProductPagination from "../components/products/ProductPagination";
import ProductFilters from "../components/products/ProductFilters";

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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* FILTER SIDEBAR */}
          <ProductFilters
            keyword={keyword}
            setKeyword={setKeyword}
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

          {/* PRODUCTS */}
          <div className="pt-6">
            <ProductHeader loading={loading} products={products} />

            <ProductGrid loading={loading} products={products} />

            <ProductPagination
              loading={loading}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
