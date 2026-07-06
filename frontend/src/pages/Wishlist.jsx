import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: token,
        },
      });

      setWishlist(res.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(`/wishlist/${productId}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(res.data.message);

      setWishlist((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p._id !== productId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  return (
    <section className="min-h-screen bg-[#F8F8F8] py-8">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 sm:text-sm">
              Your Collection
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Wishlist
            </h1>

            <p className="mt-3 max-w-xl text-sm text-neutral-500 sm:text-base lg:text-lg">
              Save your favourite pieces and come back anytime.
            </p>
          </div>

          {!loading && (
            <div className="w-fit rounded-full border border-neutral-200 bg-white px-5 py-2.5">
              <span className="text-sm font-medium text-neutral-700">
                {wishlist?.products?.length || 0} Items
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white animate-pulse"
              >
                <div className="aspect-[4/5] bg-neutral-200"></div>

                <div className="space-y-3 p-3 sm:space-y-4 sm:p-5">
                  <div className="h-4 w-16 rounded bg-neutral-200"></div>
                  <div className="h-5 w-full rounded bg-neutral-200"></div>
                  <div className="h-5 w-2/3 rounded bg-neutral-200"></div>
                  <div className="h-6 w-20 rounded bg-neutral-200"></div>
                  <div className="h-11 rounded-xl bg-neutral-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : wishlist?.products?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {wishlist.products.map((product) => (
              <div key={product._id} className="flex flex-col">
                <ProductCard product={product} />

                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="mt-3 h-10 rounded-xl border border-red-200 bg-white px-2 text-xs font-medium text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white sm:mt-4 sm:h-12 sm:text-sm"
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14 md:px-16">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
                ♡
              </div>

              <h2 className="mt-6 text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
                Your Wishlist is Empty
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8 lg:text-lg">
                Save products you love so they'll always be here waiting for
                you.
              </p>

              <Link
                to="/products"
                className="mx-auto mt-8 flex h-12 w-full max-w-[240px] items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-neutral-800 sm:h-14 sm:text-base"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;
