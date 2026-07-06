import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
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
        {/* Header */}

        <div className="mb-12 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Sparkles size={14} />
              Featured Collection
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Trending This Week
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
              Discover our most loved styles, hand-picked for this week's
              collection.
            </p>
          </div>

          <Link
            to="/products"
            className="
              hidden
              md:inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-neutral-300
              px-7
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300
              hover:border-black
              hover:bg-black
              hover:text-white
            "
          >
            View All Products
          </Link>
        </div>

        {/* Products */}

        {loading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-10 flex justify-center md:hidden">
              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-300
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                "
              >
                View All Products
              </Link>
            </div>
          </>
        ) : (
          <div
            className="
              rounded-3xl
              border
              border-neutral-200
              bg-white
              py-20
              text-center
            "
          >
            <h3 className="text-xl font-semibold text-neutral-900">
              No Featured Products
            </h3>

            <p className="mt-2 text-neutral-500">
              Check back soon for our latest collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
