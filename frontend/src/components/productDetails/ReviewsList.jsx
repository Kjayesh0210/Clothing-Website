import React from "react";
import { Star, Trash2 } from "lucide-react";

function ReviewsList({ reviews, currentUserId, deleteReview }) {
  return (
    <section className="mt-16 lg:mt-20">
      {/* Header */}
      <div className="mb-8 lg:mb-10">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 sm:text-sm">
          Customer Experience
        </p>

        <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Customer Reviews
        </h2>
      </div>

      {reviews?.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center sm:py-16">
          <div className="mb-4 text-5xl">⭐</div>

          <h3 className="text-xl font-semibold text-neutral-900 sm:text-2xl">
            No Reviews Yet
          </h3>

          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            Be the first customer to review this product.
          </p>
        </div>
      ) : (
        <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1 sm:max-h-[650px]">
          {reviews.map((review, index) => {
            const isCurrentUser =
              review.user?.toString?.() === currentUserId ||
              review.user?._id === currentUserId;

            return (
              <div
                key={review._id || index}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white sm:h-12 sm:w-12 sm:text-lg">
                      {review.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="truncate text-base font-semibold text-neutral-900 sm:text-lg">
                          {review.name}
                        </h4>

                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 sm:px-3">
                          ★ {review.rating}.0
                        </span>
                      </div>

                      <div className="mt-2 flex gap-1">
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
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={18} strokeWidth={2.2} />
                    </button>
                  )}
                </div>

                <p className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
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
