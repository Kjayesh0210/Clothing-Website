import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

import { lazy, Suspense } from "react";

const RelatedProducts = lazy(() => import("../components/RelatedProducts"));
import { CartContext } from "../context/CartContext";
import ProductGallery from "../components/productDetails/ProductGallery";
import ProductInfo from "../components/productDetails/ProductInfo";
import ReviewForm from "../components/productDetails/ReviewForm";
import ReviewsList from "../components/productDetails/ReviewsList";
import ProductActions from "../components/productDetails/ProductActions";
import ProductShare from "../components/productDetails/ProductShare";
import ProductDetailsSkeleton from "../components/productDetails/ProductDetailsSkeleton";

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
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
    checkCanReview();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct(res.data);
      setSelectedImage(res.data.images?.[0]);

      checkWishlist(res.data._id);
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
      setIsInWishlist(true);
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

  const deleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}/review/${reviewId}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Review deleted");
      fetchProduct();
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: token,
        },
      });

      const exists = res.data.products.some((item) => item._id === product._id);

      setIsInWishlist(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(`/wishlist/${product._id}`, {
        headers: {
          Authorization: token,
        },
      });

      setIsInWishlist(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  const checkCanReview = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await api.get(`/products/${id}/can-review`, {
        headers: {
          Authorization: token,
        },
      });

      setCanReview(res.data.canReview);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-16">
        {/* Left */}
        <div className="space-y-4 lg:space-y-6">
          <ProductGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Desktop Only */}
          <div className="hidden lg:block">
            <ReviewsList
              reviews={product.reviews}
              currentUserId={currentUser?._id}
              deleteReview={deleteReview}
            />
          </div>
        </div>

        {/* Right */}
        <div className="w-full space-y-4 lg:ml-auto lg:max-w-[500px] lg:space-y-4">
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <ProductActions
            product={product}
            cartLoading={cartLoading}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            isInWishlist={isInWishlist}
          />

          <ProductShare />

          <ReviewForm
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            reviewLoading={reviewLoading}
            submitReview={submitReview}
            canReview={canReview}
          />

          {/* Mobile & Tablet Only */}
          <div className="lg:hidden">
            <ReviewsList
              reviews={product.reviews}
              currentUserId={currentUser?._id}
              deleteReview={deleteReview}
            />
          </div>
        </div>
      </div>

      <div>
        <Suspense fallback={null}>
          <RelatedProducts productId={product._id} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductDetails;
