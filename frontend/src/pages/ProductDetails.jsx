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

  if (!product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="mx-auto w-full px-6 py-10 lg:px-16">
      <div className="h-5"></div>
      <div className="grid items-start gap-12 lg:grid-cols-[10px_auto_auto_10px]">
        <div className="col-start-2">
          <ProductGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <div className="h-10"></div>
          <div className="mt-12">
            <ReviewsList
              reviews={product.reviews}
              currentUserId={currentUser?._id}
              deleteReview={deleteReview}
            />
          </div>
        </div>

        <div className="w-full max-w-[500px]">
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <div className="h-10" />

          <ProductActions
            product={product}
            cartLoading={cartLoading}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
          />

          <div className="h-8" />

          <ProductShare />

          <div className="h-12" />

          <ReviewForm
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            reviewLoading={reviewLoading}
            submitReview={submitReview}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-5"></div>
        <div>
          <div className="mt-20">
            <Suspense fallback={null}>
              <RelatedProducts productId={product._id} />
            </Suspense>
          </div>
          <div className="h-4"></div>
        </div>
        <div className="w-5"></div>
      </div>
    </div>
  );
}

export default ProductDetails;
