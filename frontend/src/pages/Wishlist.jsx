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
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="
        animate-pulse
        border
        rounded-xl
        overflow-hidden
        bg-white
        "
            >
              <div className="h-80 bg-gray-200"></div>

              <div className="p-4">
                <div className="h-3 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>

                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlist?.products?.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />

              <button
                onClick={() => removeFromWishlist(product._id)}
                className="
                w-full
                mt-3
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-lg
                transition
                "
              >
                Remove From Wishlist
              </button>
            </div>
          ))}

          {(!wishlist?.products || wishlist.products.length === 0) && (
            <div className="flex flex-col items-center">
              <p className="mb-4">Your wishlist is empty.</p>

              <Link
                to="/products"
                className="
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
                "
              >
                Explore Products
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
