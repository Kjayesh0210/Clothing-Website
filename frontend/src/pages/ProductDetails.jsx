import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import { lazy, Suspense } from "react";

const RelatedProducts = lazy(() => import("../components/RelatedProducts"));
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { fetchCartCount } = useContext(CartContext);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct(res.data);
      setSelectedImage(res.data.images?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      if (cartLoading) return;
      setCartLoading(true);
      if (product.sizes?.length > 0 && !selectedSize) {
        toast.error("Please select a size");

        return;
      }
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          state: {
            redirectTo: `/products/${id}`,
          },
        });

        return;
      }

      await api.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      await fetchCartCount();

      toast.success("Added To Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add To Cart");
    } finally {
      setCartLoading(false);
    }
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          state: {
            redirectTo: `/products/${id}`,
          },
        });

        return;
      }

      await api.post(
        "/wishlist/add",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Added To Wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add To Wishlist");
    }
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!comment.trim()) {
        toast.error("Please write a review");
        return;
      }

      if (reviewLoading) return;
      setReviewLoading(true);
      if (!token) {
        navigate("/login", {
          state: {
            redirectTo: `/products/${id}`,
          },
        });

        return;
      }

      await api.post(
        `/products/${id}/review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Review Added");

      setComment("");
      setRating(5);

      fetchProduct();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add Review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="h-[500px] bg-gray-200 rounded-lg"></div>

            <div className="flex gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-24 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          <div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>

            <div className="h-5 bg-gray-200 rounded w-40 mb-4"></div>

            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>

            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>

            <div className="flex gap-3 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-14 h-10 bg-gray-200 rounded" />
              ))}
            </div>

            <div className="h-12 bg-gray-200 rounded mb-3"></div>

            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="relative">
            <img
              loading="lazy"
              src={selectedImage || "https://via.placeholder.com/500"}
              alt={product.title}
              className="
      w-full
      h-[500px]
      object-cover
      rounded-lg
      border
      "
            />

            {product.discountPercentage > 0 && (
              <div
                className="
        absolute
        top-3
        left-3
        bg-red-500
        text-white
        px-3
        py-1
        rounded
        "
              >
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                loading="lazy"
                onClick={() => setSelectedImage(image)}
                className={`
          w-24
          h-24
          object-cover
          rounded
          border
          cursor-pointer
          ${selectedImage === image ? "border-black" : ""}
        `}
              />
            ))}
          </div>
        </div>

        <div>
          <h1
            className="
            text-4xl
            font-bold
            mb-4
            "
          >
            {product.title}
          </h1>

          <div
            className="
            text-yellow-500
            text-lg
            mb-3
            "
          >
            ⭐ {product.rating} ({product.numReviews} Reviews)
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold">₹{product.price}</span>

            {product.originalPrice > product.price && (
              <>
                <span className="line-through text-gray-500 ml-3">
                  ₹{product.originalPrice}
                </span>

                <span className="text-green-600 ml-3">
                  {product.discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p
            className="
            text-gray-500
            mb-2
            "
          >
            Category: {product.category}
          </p>
          <p className="text-gray-500">Gender: {product.gender}</p>
          <p
            className={`
            font-semibold
            mb-4
            ${product.sizes?.some((s) => s.stock > 0) ? "text-green-600" : "text-red-500"}
            `}
          >
            {product.sizes?.some((s) => s.stock > 0)
              ? "In Stock"
              : "Out Of Stock"}
          </p>

          <p
            className="
            text-gray-700
            leading-7
            mb-6
            "
          >
            {product.description}
          </p>
          <div className="mt-5">
            <p className="font-semibold mb-2">Select Size</p>

            <div className="flex gap-3">
              {product.sizes?.map((item) => (
                <button
                  key={item.size}
                  disabled={item.stock === 0}
                  onClick={() => setSelectedSize(item.size)}
                  className={`
      px-4
      py-2
      border
      rounded

      ${
        selectedSize === item.size
          ? "bg-black text-white border-black"
          : "hover:border-black"
      }

      ${item.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}
    `}
                >
                  {item.size}

                  {item.stock === 0 ? " (Out)" : ` (${item.stock})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {product.sizes?.some((s) => s.stock > 0) ? (
              <>
                <button
                  disabled={cartLoading}
                  onClick={addToCart}
                  className="bg-black text-white py-3 rounded disabled:opacity-50"
                >
                  {cartLoading ? "Adding..." : "Add To Cart"}
                </button>

                {/* <button
                  onClick={() => {
                    if (product.sizes?.length > 0 && !selectedSize) {
                      toast.error("Please select a size");
                      return;
                    }

                    navigate("/checkout", {
                      state: {
                        buyNow: true,
                        product,
                        quantity: 1,
                        size: selectedSize,
                      },
                    });
                  }}
                  className="
                  bg-green-600
                  text-white
                  py-3
                  rounded
                  "
                >
                  Buy Now
                </button> */}
              </>
            ) : (
              <button
                disabled
                className="
                bg-gray-400
                text-white
                py-3
                rounded
                "
              >
                Out Of Stock
              </button>
            )}

            <button
              onClick={addToWishlist}
              className="
              bg-gray-800
              text-white
              py-3
              rounded
              "
            >
              Add To Wishlist
            </button>
            <div className="mt-5">
              <p className="font-semibold mb-3">Share Product</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied");
                  }}
                  className="
      border
      px-4
      py-2
      rounded-lg
      hover:bg-gray-100
      "
                >
                  Copy Link
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=${encodeURIComponent(
                        window.location.href,
                      )}`,
                      "_blank",
                    )
                  }
                  className="
      bg-green-500
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-green-600
      "
                >
                  WhatsApp
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href,
                      )}`,
                      "_blank",
                    )
                  }
                  className="
      bg-black
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-gray-800
      "
                >
                  Share on X
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2
              className="
              text-2xl
              font-semibold
              mb-4
              "
            >
              Write Review
            </h2>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="
              border
              p-3
              w-full
              "
            >
              <option value="1">1 Star</option>
              <option value="2">2 Star</option>
              <option value="3">3 Star</option>
              <option value="4">4 Star</option>
              <option value="5">5 Star</option>
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Write your review..."
              className="
              border
              w-full
              mt-3
              p-3
              "
            />

            <button
              disabled={reviewLoading}
              onClick={submitReview}
              className="bg-black text-white px-6 py-3 mt-3 rounded disabled:opacity-50"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2
          className="
          text-3xl
          font-bold
          mb-6
          "
        >
          Customer Reviews
        </h2>

        {product.reviews?.length === 0 ? (
          <p>No Reviews Yet</p>
        ) : (
          product.reviews?.map((review, index) => (
            <div
              key={review._id || index}
              className="
              border-b
              py-4
              "
            >
              <p className="font-semibold">{review.name}</p>

              <p>⭐ {review.rating}</p>

              <p className="mt-2">{review.comment}</p>
            </div>
          ))
        )}
        <Suspense fallback={null}>
          <RelatedProducts productId={product._id} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductDetails;
