import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products/featured");

      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10">New Arrivals</h2>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No featured products found.</p>
      )}
    </section>
  );
}

export default FeaturedProducts;
