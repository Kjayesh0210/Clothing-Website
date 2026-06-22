import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [inStock, setInStock] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [category, keyword, minPrice, maxPrice, sort, inStock, page]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/products?category=${category}&keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&inStock=${inStock}&sort=${sort}&page=${page}`,
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <div
        className="
        flex
        flex-wrap
        gap-3
        mb-8
        "
      >
        <input
          placeholder="Search Products"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        >
          <option value="">All Categories</option>

          <option value="hoodie">Hoodie</option>

          <option value="tshirt">T-Shirt</option>

          <option value="jeans">Jeans</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
          className="border p-2"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border p-2"
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
            setSort("");
            setInStock(false);
            setPage(1);
          }}
          className="
          bg-red-500
          text-white
          px-4
          py-2
          "
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

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
    </div>
  );
}

export default Products;
