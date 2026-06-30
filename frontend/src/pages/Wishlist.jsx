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
    <section className="min-h-screen bg-[#F8F8F8] py-16">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Header */}
        <div className="h-10"></div>
        <div className="flex items-end justify-between">
          <div className="flex">
            <div className="w-13"></div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Your Collection
              </p>

              <h1 className="mt-3 text-5xl font-bold tracking-tight text-neutral-900">
                Wishlist
              </h1>

              <p className="mt-4 text-lg text-neutral-500">
                Save your favourite pieces and come back anytime.
              </p>
            </div>
          </div>
          {!loading && (
            <div className="rounded-full border border-neutral-200 bg-white px-6 py-3">
              <span className="text-sm font-medium text-neutral-700">
                {wishlist?.products?.length || 0} Items
              </span>
            </div>
          )}
        </div>
        <div className="h-10"></div>

        {/* Loading */}
        {loading ? (
          <div className="grid justify-center gap-x-8 gap-y-12 grid-cols-[repeat(auto-fit,310px)]">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="
                w-[310px]
                overflow-hidden
                rounded-3xl
                border
                border-neutral-200
                bg-white
                animate-pulse
              "
              >
                <div className="h-[390px] bg-neutral-200"></div>

                <div className="space-y-4 p-5">
                  <div className="h-4 w-20 rounded bg-neutral-200"></div>
                  <div className="h-5 w-full rounded bg-neutral-200"></div>
                  <div className="h-5 w-2/3 rounded bg-neutral-200"></div>
                  <div className="h-6 w-24 rounded bg-neutral-200"></div>

                  <div className="h-12 rounded-xl bg-neutral-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : wishlist?.products?.length > 0 ? (
          <div className="grid justify-center gap-x-8 gap-y-14 grid-cols-[repeat(auto-fit,310px)]">
            {wishlist.products.map((product) => (
              <div key={product._id} className="flex flex-col">
                <ProductCard product={product} />

                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="
                  mt-5
                  h-12
                  rounded-xl
                  border
                  border-red-200
                  bg-white
                  text-sm
                  font-medium
                  text-red-600
                  transition-all
                  duration-300
                  hover:bg-red-500
                  hover:text-white
                "
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[65vh] items-center justify-center">
            <div
              className="
              w-[700px]
              rounded-3xl
              border
              border-neutral-200
              bg-white
              p-16
              text-center
              shadow-sm
            "
            >
              <div
                className="
                mx-auto
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-neutral-100
                text-5xl
              "
              >
                ♡
              </div>

              <h2 className="mt-8 text-4xl font-bold text-neutral-900">
                Your Wishlist is Empty
              </h2>

              <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-neutral-500">
                Save products you love so they'll always be here waiting for
                you.
              </p>

              <Link
                to="/products"
                className="
                mx-auto
                mt-10
                flex
                h-14
                w-[240px]
                items-center
                justify-center
                rounded-xl
                bg-black
                text-white
                font-semibold
                transition
                hover:bg-neutral-800
              "
              >
                Explore Collection
              </Link>
            </div>
          </div>
        )}
        <div className="h-10"></div>
      </div>
    </section>
  );
}

export default Wishlist;
