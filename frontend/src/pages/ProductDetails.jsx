import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  console.log("ID:", id);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      console.log("Fetching:", id);

      const res = await api.get(`/products/${id}`);

      console.log("Product:", res.data);

      setProduct(res.data);
      setSelectedImage(res.data.images?.[0]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

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

    alert("Added To Wishlist");
  };

  const submitReview = async () => {
    const token = localStorage.getItem("token");

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

    alert("Review Added");

    fetchProduct();
  };
  // useEffect(() => {
  //   if (!product) return;

  //   const viewed = JSON.parse(localStorage.getItem("recent")) || [];

  //   const filtered = viewed.filter((item) => item !== product._id);

  //   filtered.unshift(product._id);

  //   localStorage.setItem("recent", JSON.stringify(filtered.slice(0, 5)));
  // }, [product]);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <img
            src={selectedImage || "https://via.placeholder.com/500"}
            alt={product.title}
            className="
              w-full
              h-[500px]
              object-cover
              rounded
              "
          />

          <div
            className="
              flex
              gap-3
              mt-4
              overflow-x-auto
              "
          >
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="
              w-24
              h-24
              object-cover
              border
              rounded
              cursor-pointer
              "
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <h2 className="text-3xl mt-4">₹{product.price}</h2>

          <p className="mt-2">
            Stock:
            {product.stock}
          </p>

          <button
            onClick={addToCart}
            className="
                bg-black
                text-white
                px-6
                py-3
                mt-5
                rounded
                "
          >
            Add To Cart
          </button>
          <button
            onClick={addToWishlist}
            className="
                bg-gray-800
                text-white
                px-6
                py-3
                mt-5
                rounded
                "
          >
            Add To Wishlist
          </button>
          <div className="mt-10">
            <h2 className="text-2xl mb-3">Write Review</h2>

            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="1">1 Star</option>

              <option value="2">2 Star</option>

              <option value="3">3 Star</option>

              <option value="4">4 Star</option>

              <option value="5">5 Star</option>
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="
                  border
                  w-full
                  mt-3
                  p-3
                  "
            />

            <button
              onClick={submitReview}
              className="
                  bg-black
                  text-white
                  px-6
                  py-2
                  mt-3
                  "
            >
              Submit Review
            </button>
          </div>
          <p>
            ⭐ {product.rating}({product.numReviews}
            reviews )
          </p>
          <div className="mt-10">
            <h2 className="text-2xl">Reviews</h2>

            {product.reviews?.map((review, index) => (
              <div
                key={index}
                className="
                  border-b
                  py-3
                  "
              >
                <p>{review.name}</p>

                <p>⭐ {review.rating}</p>

                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
