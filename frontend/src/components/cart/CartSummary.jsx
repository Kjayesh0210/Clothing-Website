import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Tag, ArrowRight } from "lucide-react";

function CartSummary({ subtotal, shipping, discount, total }) {
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
      <div className="h-3"></div>

      <div className="grid lg:grid-cols-[10px_auto_10px] mt-10 space-y-6 px-4">
        <div></div>
        <div>
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
            <Truck size={24} className="text-green-600 shrink-0 self-center" />

            <div>
              <p className="font-semibold text-green-700">Free Delivery</p>

              <p className="text-sm text-green-600 mt-1 leading-6">
                {shipping === 0
                  ? "You've unlocked free shipping!"
                  : "Free delivery on orders above ₹999."}
              </p>
            </div>
          </div>
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
            <div className="flex items-center gap-2 text-neutral-500">
              <Tag size={18} />
              <span>Discount</span>
            </div>

            <span className="font-semibold text-lg text-green-600">
              -₹{discount}
            </span>
          </div>
          <div className="h-5"></div>

          <div className="border-t border-neutral-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold">₹{total}</span>
            </div>
          </div>
          <div className="h-3"></div>

          <Link
            to="/checkout"
            className="
          mt-10
          h-16
          w-full
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
        "
          >
            Proceed to Checkout
            <ArrowRight size={22} />
          </Link>
          <div className="h-3"></div>

          <div
            className="
          mt-8
          rounded-2xl
          bg-neutral-50
          border
          border-neutral-200
          p-5
          flex
          gap-4
        "
          >
            <ShieldCheck size={24} className="text-neutral-700 shrink-0 mt-1" />

            <div>
              <p className="font-semibold">Secure Checkout</p>

              <p className="text-sm text-neutral-500 mt-1 leading-6">
                Your payment information is encrypted and securely processed.
              </p>
            </div>
          </div>
          <div className="h-3"></div>

          <div className="mt-8 pt-6 border-t border-neutral-200 space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Estimated Delivery</span>

              <span className="font-medium text-neutral-900">
                3–5 Business Days
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-500">Return Policy</span>

              <span className="font-medium text-neutral-900">
                7 Days Easy Returns
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="h-3"></div>
    </div>
  );
}

export default CartSummary;
