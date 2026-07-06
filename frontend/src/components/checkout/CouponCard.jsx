import { TicketPercent, CheckCircle, ArrowRight, Copy } from "lucide-react";
import toast from "react-hot-toast";

function CouponCard({ coupon, setCoupon, applyCoupon, discount }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="
            h-14
            w-full
            rounded-2xl
            border
            border-neutral-300
            bg-white
            px-5
            outline-none
            transition
            focus:border-black
            focus:ring-4
            focus:ring-neutral-100
          "
          />
        </div>

        <button
          onClick={applyCoupon}
          className="
          flex
          h-14
          min-w-[150px]
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-black
          px-8
          font-semibold
          text-white
          transition
          hover:bg-neutral-800
        "
        >
          Apply
          <ArrowRight size={18} />
        </button>
      </div>

      {discount > 0 && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex gap-4">
            <CheckCircle size={24} className="mt-1 shrink-0 text-green-600" />

            <div className="flex-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-green-700">Coupon Applied</p>

                  <p className="mt-1 text-sm text-green-600">
                    <span className="font-semibold">{coupon}</span> applied
                    successfully.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
                  {discount}% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponCard;
