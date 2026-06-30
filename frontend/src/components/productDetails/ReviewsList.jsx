import React from "react";
import { Star, Trash2 } from "lucide-react";

function ReviewsList({ reviews, currentUserId, deleteReview }) {
  return (
    <section className="mt-20">
      {/* Header */}

      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Customer Experience
        </p>

        <h2 className="mt-2 text-4xl font-bold text-neutral-900">
          Customer Reviews
        </h2>
      </div>

      {reviews?.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-neutral-300
            bg-neutral-50
            py-16
            text-center
          "
        >
          <div className="mb-4 text-5xl">⭐</div>

          <h3 className="text-2xl font-semibold text-neutral-900">
            No Reviews Yet
          </h3>

          <p className="mt-3 text-neutral-500">
            Be the first customer to review this product.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => {
            const isCurrentUser =
              review.user?.toString?.() === currentUserId ||
              review.user?._id === currentUserId;

            return (
              <div
                key={review._id || index}
                className="
                  group
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-black
                        text-lg
                        font-semibold
                        text-white
                      "
                    >
                      {review.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-neutral-900">
                          {review.name}
                        </h4>

                        <span
                          className="
        rounded-full
        bg-green-100
        px-3
        py-1
        text-sm
        font-semibold
        text-green-700
      "
                        >
                          ★ {review.rating}.0
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="currentColor"
                            className="text-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {isCurrentUser && (
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete your review?",
                            )
                          ) {
                            deleteReview(review._id);
                          }
                        }}
                        title="Delete Review"
                        className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-neutral-400
                      transition-all
                      duration-300
                      hover:bg-red-50
                      hover:text-red-500
                    "
                      >
                        <Trash2 size={20} strokeWidth={2.2} />
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-5 leading-8 text-neutral-600">
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default React.memo(ReviewsList);
