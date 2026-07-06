import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import ProductPagination from "../components/products/ProductPagination";
import SearchBar from "../components/layout/Navbar/SearchBar";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [page, keyword]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        params: {
          page,
          keyword,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (value) => {
    setKeyword(value);
    setPage(1);
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
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Manage all products in your store.
          </p>
        </div>

        {/* Center */}
        <div className="w-full max-w-md">
          <SearchBar
            keyword={keyword}
            searchProducts={searchProducts}
            suggestions={[]}
            setSuggestions={() => {}}
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <p className="whitespace-nowrap text-sm text-neutral-500">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>

          <Link
            to="/admin/products/add"
            className="flex h-11 items-center justify-center rounded-xl bg-black px-6 font-medium text-white transition hover:bg-neutral-800"
          >
            + Add Product
          </Link>
        </div>
      </div>

      <div className="min-h-[calc(100vh-260px)]">
        {products.length === 0 ? (
          <div className="flex h-60 items-center justify-center">
            <h2 className="text-lg text-neutral-500">No Products Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:gap-5 xl:grid-cols-4">
            {products.map((product) => {
              const totalStock =
                product.sizes?.reduce((sum, item) => sum + item.stock, 0) || 0;

              const inStock =
                product.sizes?.some((item) => item.stock > 0) || false;

              return (
                <div
                  key={product._id}
                  className="
                  flex
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
                >
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/500x600"
                    }
                    alt={product.title}
                    className="h-44 w-full object-cover lg:h-48"
                  />

                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-neutral-900 lg:text-base">
                      {product.title}
                    </h2>

                    <p className="mt-2 text-lg font-bold text-neutral-900">
                      ₹{product.price}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                      <span>{product.category?.name || "No Category"}</span>

                      <span>•</span>

                      <span>{product.gender}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.sizes?.map((size) => (
                        <span
                          key={size.size}
                          className="
                  rounded-full
                  bg-neutral-100
                  px-2.5
                  py-0.5
                  text-[11px]
                  font-medium
                  text-neutral-700
                "
                        >
                          {size.size} ({size.stock})
                        </span>
                      ))}
                    </div>

                    <div className="mt-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          inStock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {inStock ? `${totalStock} In Stock` : "Out Of Stock"}
                      </span>
                    </div>

                    <div className="mt-auto flex gap-2 pt-4">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="
                        flex-1
                        rounded-lg
                        border
                        border-neutral-300
                        py-2
                        text-center
                        text-sm
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
                        rounded-lg
                        bg-red-500
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-red-600
                      "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10">
        <ProductPagination
          loading={loading}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default AdminProducts;
