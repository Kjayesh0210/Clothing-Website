import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
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

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

      {loading ? (
        <p>Loading wishlist...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlist?.products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

          {(!wishlist?.products || wishlist.products.length === 0) && (
            <div className="col-span-full text-center py-20 text-gray-500">
              Your wishlist is empty.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
