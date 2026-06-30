import React from "react";

function ReviewForm({
  rating,
  setRating,
  comment,
  setComment,
  reviewLoading,
  submitReview,
}) {
  return (
    <div
      className="
        mt-12
        rounded-2xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      {/* Header */}

      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Customer Feedback
        </p>

        <h2 className="mt-2 text-3xl font-bold text-neutral-900">
          Write a Review
        </h2>
      </div>

      {/* Rating */}

      <div className="mb-7">
        <label className="mb-3 block text-sm font-semibold text-neutral-800">
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
            text-base
            transition-all
            duration-200
            focus:border-black
            focus:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-black/5
          "
        >
          <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
          <option value="4">⭐⭐⭐⭐ 4 Stars</option>
          <option value="3">⭐⭐⭐ 3 Stars</option>
          <option value="2">⭐⭐ 2 Stars</option>
          <option value="1">⭐ 1 Star</option>
        </select>
      </div>

      {/* Review */}

      <div className="mb-8">
        <label className="mb-3 block text-sm font-semibold text-neutral-800">
          Your Review
        </label>

        <textarea
          rows="2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          className="
    w-full
    h-14
    resize-none
    rounded-xl
    border
    border-neutral-300
    bg-neutral-50
    px-4
    py-4
    text-base
    transition-all
    duration-200
    focus:border-black
    focus:bg-white
    focus:outline-none
    focus:ring-2
    focus:ring-black/5
  "
        />
      </div>

      {/* Button */}

      <button
        disabled={reviewLoading}
        onClick={submitReview}
        className="
          w-full
          h-14
          rounded-xl
          bg-black
          text-base
          font-semibold
          text-white
          transition-all
          duration-300
          hover:bg-neutral-800
          hover:-translate-y-0.5
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {reviewLoading ? "Submitting Review..." : "Submit Review"}
      </button>
    </div>
  );
}

export default React.memo(ReviewForm);
