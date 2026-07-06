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
    <div className="mt-4">
      <h2
        className="
        mb-6
        text-2xl
        font-bold
        sm:mb-8
        sm:text-3xl
      "
      >
        You May Also Like
      </h2>

      <div
        className="
        grid
        grid-cols-2
        gap-4
        sm:gap-5
        lg:grid-cols-4
        lg:gap-6
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
