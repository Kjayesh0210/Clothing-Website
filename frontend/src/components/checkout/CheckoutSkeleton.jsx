import { Truck, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

function CheckoutSummary({
  subtotal,
  shipping,
  discount,
  total,
  paymentLoading,
  handlePayment,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-neutral-200
        shadow-md
        p-8
      "
    >
      <h2 className="text-2xl font-bold tracking-tight">Order Summary</h2>

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-green-200
          bg-green-50
          p-5
          flex
          gap-4
        "
      >
        <Truck size={24} className="text-green-600 shrink-0 mt-1" />

        <div>
          <p className="font-semibold text-green-700">
            {shipping === 0
              ? "Free Delivery Unlocked"
              : "Free Delivery Available"}
          </p>

          <p className="text-sm text-green-600 mt-1 leading-6">
            {shipping === 0
              ? "Congratulations! Your order qualifies for free shipping."
              : "Add a little more to your cart and enjoy FREE delivery above ₹999."}
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-neutral-500">Subtotal</span>

          <span className="font-semibold text-lg">₹{subtotal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-500">Shipping</span>

          <span
            className={`font-semibold text-lg ${
              shipping === 0 ? "text-green-600" : "text-neutral-900"
            }`}
          >
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-neutral-500">Discount</span>

          <span className="font-semibold text-lg text-green-600">
            -₹{discount}
          </span>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>

            <span className="text-3xl font-bold">₹{total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={paymentLoading}
        className="
          mt-10
          w-full
          h-16
          rounded-2xl
          bg-black
          text-white
          font-semibold
          text-lg
          flex
          items-center
          justify-center
          gap-3
          transition-all
          duration-300
          hover:bg-neutral-800
          hover:-translate-y-1
          active:scale-[0.98]
          disabled:opacity-70
          disabled:cursor-not-allowed
        "
      >
        {paymentLoading ? (
          <>
            <Loader2 size={22} className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            Continue to Payment
            <ArrowRight size={22} />
          </>
        )}
      </button>

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-neutral-200
          bg-neutral-50
          p-5
        "
      >
        <div className="flex gap-4">
          <ShieldCheck size={24} className="text-neutral-700 shrink-0 mt-1" />

          <div>
            <p className="font-semibold">Secure Checkout</p>

            <p className="text-sm text-neutral-500 mt-1 leading-6">
              All transactions are encrypted and securely processed through
              Razorpay. Your card details are never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-200">
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Estimated Delivery</span>

            <span className="font-medium">3–5 Business Days</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">Return Policy</span>

            <span className="font-medium">7 Days Easy Return</span>
          </div>

          <div className="flex justify-between">
            <span className="text-neutral-500">Payment Method</span>

            <span className="font-medium">Razorpay</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-neutral-100 p-5">
        <p className="font-semibold text-sm">Need Help?</p>

        <p className="text-sm text-neutral-500 mt-2 leading-6">
          Our support team is available 24×7 to assist you with payments,
          delivery, returns, and order tracking.
        </p>
      </div>
    </div>
  );
}

export default CheckoutSummary;
