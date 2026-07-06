import { Truck, ShieldCheck, ArrowRight, Loader2, Tag } from "lucide-react";

function CheckoutSummary({
  subtotal,
  shipping,
  discount,
  total,
  paymentLoading,
  handlePayment,
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-md sm:p-8">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Order Summary</h2>

        {/* Free Shipping */}
        <div className="flex gap-4 rounded-2xl border border-green-200 bg-green-50 p-5">
          <Truck size={24} className="mt-1 shrink-0 text-green-600" />

          <div>
            <p className="font-semibold text-green-700">Free Delivery</p>

            <p className="mt-1 text-sm leading-6 text-green-600">
              {shipping === 0
                ? "You've unlocked free shipping!"
                : "Free delivery on orders above ₹999."}
            </p>
          </div>
        </div>

        {/* Price Details */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Subtotal</span>
            <span className="text-lg font-semibold">₹{subtotal}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Shipping</span>

            <span
              className={`text-lg font-semibold ${
                shipping === 0 ? "text-green-600" : "text-neutral-900"
              }`}
            >
              {shipping === 0 ? "FREE" : `₹${shipping}`}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-500">
              <Tag size={18} />
              <span>Discount</span>
            </div>

            <span className="text-lg font-semibold text-green-600">
              -₹{discount}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-neutral-200 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold">₹{total}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={paymentLoading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-black text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:h-16 sm:text-lg"
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

        {/* Security */}
        <div className="flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <ShieldCheck size={24} className="mt-1 shrink-0 text-neutral-700" />

          <div>
            <p className="font-semibold">Secure Checkout</p>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              All transactions are encrypted and securely processed through
              Razorpay. Your payment information is never stored on our servers.
            </p>
          </div>
        </div>

        {/* Extra Information */}
        <div className="space-y-4 border-t border-neutral-200 pt-6 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Estimated Delivery</span>
            <span className="font-medium text-neutral-900">
              3–5 Business Days
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Return Policy</span>
            <span className="font-medium text-neutral-900">
              7 Days Easy Returns
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Payment Method</span>
            <span className="font-medium text-neutral-900">Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
