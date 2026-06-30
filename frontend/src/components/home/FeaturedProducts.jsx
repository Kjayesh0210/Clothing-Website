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
    <section className="w-full bg-white h-[630px]">
      <div className="w-full">
        <div className="mx-auto flex h-full w-full flex-col px-[80px]">
          {/* Header */}
          <div className="flex items-start justify-between pt-6">
            <div className="flex">
              <div className="w-26"></div>
              <div>
                <h2 className="text-[52px] font-black uppercase leading-none tracking-tight text-[#000000]">
                  FEATURED PRODUCTS
                </h2>

                <p className="mt-4 text-[18px] text-[#5F6672]">
                  Handpicked essentials for everyday wear.
                </p>
              </div>
            </div>
            <div className="flex">
              <Link
                to="/products"
                className="flex items-center gap-2 text-[18px] font-bold uppercase transition hover:opacity-70"
              >
                VIEW ALL
                <span className="text-2xl">→</span>
              </Link>
              <div className="w-26"></div>
            </div>
          </div>
            <div className="h-6"></div>
          {/* Products */}
          <div className="mt-8 flex justify-center">
          <div className="w-26"></div>
            {loading ? (
                <div className="grid w-full grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
                <div className="grid w-full grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
                <div className="flex h-[360px] w-full items-center justify-center rounded-3xl border border-neutral-200">
                <p className="text-neutral-500">No featured products found.</p>
              </div>
            )}
            <div className="w-26"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
