import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import ProductPagination from "../components/products/ProductPagination";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products?page=${page}`);

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
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

  const changePage = (newPage) => {
    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      <div className="flex">
        <div className="w-20"></div>
        <div className="w-full">
          <div className="h-10"></div>
          <div
            className="
            mb-10
            flex
            items-center
            justify-between
          "
          >
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Products</h1>

              <p className="mt-2 text-neutral-500">
                Manage all products in your store.
              </p>
            </div>

            <div className="flex items-center justify-center h-full">
              <Link
                to="/admin/products/add"
                className="
                flex
                h-8
                w-[200px]
                items-center
                justify-center
                rounded-xl
                bg-black
                font-medium
                text-white
                transition
                hover:bg-neutral-800
              "
              >
                + Add Product
              </Link>
            </div>
          </div>

          <div className="min-h-[calc(100vh-280px)]">
            {products.length === 0 ? (
              <div className="flex h-60 items-center justify-center">
                <h2 className="text-lg text-neutral-500">No Products Found</h2>
              </div>
            ) : (
              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-6
                "
              >
                {products.map((product) => {
                  const totalStock =
                    product.sizes?.reduce((sum, item) => sum + item.stock, 0) ||
                    0;

                  const inStock =
                    product.sizes?.some((item) => item.stock > 0) || false;

                  return (
                    <div
                      key={product._id}
                      className="
                      bg-white
                      rounded-2xl
                      border
                      border-neutral-200
                      overflow-hidden
                      shadow-sm
                      hover:shadow-lg
                      transition-all
                      duration-300
                      flex
                      flex-col
                      "
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/500x600"
                        }
                        alt={product.title}
                        className="
                        h-72
                        w-full
                        object-cover
                        "
                      />
                      <div className="flex">
                        <div className="w-2"></div>
                        <div className="flex flex-1 flex-col p-5">
                          <h2 className="line-clamp-2 text-lg font-semibold">
                            {product.title}
                          </h2>

                          <p className="mt-2 text-2xl font-bold">
                            ₹{product.price}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {product.category?.name || "No Category"}
                          </p>

                          <p className="text-sm text-neutral-500">
                            {product.gender}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {product.sizes?.map((size) => (
                              <span
                                key={size.size}
                                className="
                              rounded-full
                              bg-neutral-100
                              px-3
                              py-1
                              text-xs
                              "
                              >
                                {size.size} ({size.stock})
                              </span>
                            ))}
                          </div>

                          <div className="mt-4">
                            <span
                              className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-medium
                            ${
                              inStock
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }
                          `}
                            >
                              {inStock
                                ? `${totalStock} In Stock`
                                : "Out Of Stock"}
                            </span>
                          </div>
                          <div className="h-2"></div>

                          <div className="mt-auto pt-6 flex gap-3">
                            <div></div>
                            <Link
                              to={`/admin/products/edit/${product._id}`}
                              className="
                            flex-1
                            rounded-xl
                            border
                            border-neutral-300
                            py-2.5
                            text-center
                            font-medium
                            transition
                            hover:bg-neutral-100
                            "
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="
                            flex-1
                            rounded-xl
                            bg-red-500
                            py-2.5
                            font-medium
                            text-white
                            transition
                            hover:bg-red-600
                            "
                            >
                              Delete
                            </button>
                            <div></div>
                          </div>
                          <div className="h-2"></div>
                        </div>
                        <div className="w-2"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mt-12">
            <ProductPagination
              loading={loading}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        </div>
        <div className="w-20"></div>
      </div>

      <div className="h-10"></div>
    </div>
  );
}

export default AdminProducts;
