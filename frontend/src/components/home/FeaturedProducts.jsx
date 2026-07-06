import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard";
import ProductCardSkeleton from "../../components/ProductCardSkeleton";
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
    <section className="w-full bg-white">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-[80px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-left">
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-[#000000] sm:text-4xl lg:text-[52px]">
              FEATURED PRODUCTS
            </h2>

            <p className="mt-4 text-base text-[#5F6672] sm:text-lg">
              Handpicked essentials for everyday wear.
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 self-start text-sm font-bold uppercase transition hover:opacity-70 sm:text-base lg:text-[18px]"
          >
            VIEW ALL
            <span className="text-xl lg:text-2xl">→</span>
          </Link>
        </div>

        {/* Products */}
        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center rounded-3xl border border-neutral-200">
              <p className="text-neutral-500">No featured products found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
