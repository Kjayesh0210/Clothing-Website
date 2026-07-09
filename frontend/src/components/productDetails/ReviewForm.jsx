import React from "react";

function ReviewForm({
  rating,
  setRating,
  comment,
  setComment,
  reviewLoading,
  submitReview,
  canReview,
}) {
  return (
    <>
      {canReview ? (
        <div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                Customer Feedback
              </p>

              <h2 className="mt-1 text-2xl font-bold text-neutral-900 sm:text-3xl">
                Write a Review
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Rating
                </label>

                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="
            w-full
            rounded-xl
            border
            border-neutral-300
            bg-neutral-50
            px-4
            py-3
            text-sm
            transition-colors
            focus:border-black
            focus:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-black/5
            sm:text-base
          "
                >
                  <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                  <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                  <option value={3}>⭐⭐⭐ 3 Stars</option>
                  <option value={2}>⭐⭐ 2 Stars</option>
                  <option value={1}>⭐ 1 Star</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-800">
                  Your Review
                </label>

                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="
            w-full
            resize-none
            rounded-xl
            border
            border-neutral-300
            bg-neutral-50
            px-4
            py-3
            text-sm
            transition-colors
            focus:border-black
            focus:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-black/5
            sm:text-base
          "
                />
              </div>

              <button
                disabled={reviewLoading}
                onClick={submitReview}
                className="
          h-12
          w-full
          rounded-xl
          bg-black
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-neutral-800
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-60
          sm:h-14
          sm:text-base
        "
              >
                {reviewLoading ? "Submitting Review..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
      rounded-xl
      border
      border-neutral-200
      bg-neutral-50
      p-6
      text-center
    "
        >
          <p className="text-sm text-neutral-600">
            Purchase this product to write a review.
          </p>
        </div>
      )}
    </>
  );
}

export default React.memo(ReviewForm);
