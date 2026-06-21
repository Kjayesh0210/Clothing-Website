import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        params: {
          sort,
          minPrice,
          maxPrice,
          inStock,
        },
      });

      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex gap-3 mb-5 flex-wrap">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price Low → High</option>
          <option value="price-high">Price High → Low</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rated</option>
        </select>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <span className="ml-2">In Stock</span>
        </label>

        <button
          onClick={fetchProducts}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Apply
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
    </div>
  );
}

export default Products;
