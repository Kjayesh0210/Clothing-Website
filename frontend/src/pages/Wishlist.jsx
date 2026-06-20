import { useEffect, useState } from "react";

import api from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/wishlist", {
      headers: {
        Authorization: token,
      },
    });

    setWishlist(res.data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl">Wishlist</h1>

      {wishlist?.products?.map((product) => (
        <div key={product._id}>{product.title}</div>
      ))}
    </div>
  );
}

export default Wishlist;
