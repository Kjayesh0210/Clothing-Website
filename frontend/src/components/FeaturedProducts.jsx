import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
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

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold">New Arrivals</h2>

          <p className="text-gray-500 mt-2">
            Discover our latest fashion collection
          </p>
        </div>

        <Link
          to="/products"
          className="
          hidden
          md:block
          border
          px-5
          py-2
          rounded-lg
          hover:bg-black
          hover:text-white
          transition
          "
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-10 md:hidden">
            <Link
              to="/products"
              className="
              border
              px-6
              py-3
              rounded-lg
              hover:bg-black
              hover:text-white
              transition
              "
            >
              View All Products
            </Link>
          </div>
        </>
      ) : (
        <div
          className="
          text-center
          py-16
          border
          rounded-xl
          "
        >
          <p className="text-gray-500">No featured products found.</p>
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;
