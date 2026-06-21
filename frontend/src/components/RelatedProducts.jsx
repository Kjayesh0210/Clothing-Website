import { useEffect, useState } from "react";

import api from "../services/api";

import ProductCard from "./ProductCard";

function RelatedProducts({ productId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products/${productId}/related`);

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <h2
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        You May Also Like
      </h2>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
