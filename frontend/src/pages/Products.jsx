import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    console.log(res.data);
    setProducts(res.data);
  };

  return (
    <div className="grid grid-cols-4 gap-5 p-10">
      {products.map((product) => (
        <Link to={`/products/${product._id}`} key={product._id}>
          <div className="border p-4">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="
                  h-72
                  w-full
                  object-cover
                  transition
                  duration-300
                  hover:scale-105
                  "
            />

            <h2>{product.title}</h2>

            <p>₹{product.price}</p>
            <p>⭐ {product.rating || 0}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Products;
