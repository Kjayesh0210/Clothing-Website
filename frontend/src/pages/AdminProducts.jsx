import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <h1>Loading Products...</h1>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10">
      <div
        className="
      flex
      flex-col
      md:flex-row
      justify-between
      items-start
      md:items-center
      gap-4
      mb-6
      "
      >
        <h1 className="text-4xl font-bold">Products</h1>

        <Link
          to="/admin/products/add"
          className="
        bg-green-500
        text-white
        px-4
        py-2
        rounded
        "
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <h2>No Products Found</h2>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="
          border
          rounded
          p-4
          mb-4
          flex
          flex-col
          lg:flex-row
          justify-between
          gap-4
          "
          >
            <div
              className="
            flex
            flex-col
            sm:flex-row
            gap-4
            "
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/100"}
                alt={product.title}
                className="
              w-full
              sm:w-24
              h-48
              sm:h-24
              object-cover
              rounded
              "
              />

              <div
                className="
              flex
              flex-col
              gap-1
              "
              >
                <h2 className="font-semibold text-lg">{product.title}</h2>

                <p>Price: ₹{product.price}</p>

                <p>Category: {product.category}</p>

                <p
                  className={
                    product.stock === 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  Stock: {product.stock}
                </p>

                <p>Images: {product.images?.length || 0}</p>
              </div>
            </div>

            <div
              className="
            flex
            flex-col
            sm:flex-row
            gap-3
            "
            >
              <Link
                to={`/admin/products/edit/${product._id}`}
                className="
              bg-blue-500
              text-white
              px-4
              py-2
              rounded
              text-center
              "
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded
              "
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminProducts;
