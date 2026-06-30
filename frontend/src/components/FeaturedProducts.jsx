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
    <section className="bg-neutral-50 py-16 md:py-20 lg:py-28">
      <div className="mx-auto w-[95%] max-w-7xl">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <>
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-neutral-500">
                Featured Collection
              </p>

              <h2 className="mt-4 text-4xl font-black text-neutral-900 md:text-5xl">
                Trending This Week
              </h2>

              <p className="mt-4 max-w-xl text-lg text-neutral-600">
                Hand-picked styles loved by thousands of customers.
              </p>
            </>

            <p className="text-gray-500 mt-2">
              Discover our latest fashion collection
            </p>
          </div>

          <Link
            to="/products"
            className="
            hidden
            md:inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-neutral-300
            px-6
            py-3
            font-semibold
            transition
            hover:border-black
            hover:bg-black
            hover:text-white
            "
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="grid grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="flex justify-center mt-10 md:hidden">
              <Link
                to="/products"
                className="
              border border-neutral-300
              px-8
              py-4
              rounded-full
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
          border border-neutral-200 bg-white
          rounded-3xl
          "
          >
            <p className="text-gray-500">No featured products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
