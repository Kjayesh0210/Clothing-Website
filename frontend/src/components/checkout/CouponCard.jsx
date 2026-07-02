import { TicketPercent, CheckCircle, ArrowRight, Copy } from "lucide-react";
import toast from "react-hot-toast";

function CouponCard({ coupon, setCoupon, applyCoupon, discount }) {
  return (
    <div className="space-y-8">
      <div className="h-4"></div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-neutral-300
              bg-white
              pl-14
              pr-5
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
            h-14
            px-8
            rounded-2xl
            bg-black
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-neutral-800
            transition
            min-w-[150px]
          "
        >
          Apply
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="h-4"></div>

      {discount > 0 && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex gap-4">
          <CheckCircle size={24} className="text-green-600 shrink-0 mt-1" />

          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-700">Coupon Applied</p>

              <p className="text-sm text-green-600 mt-1">
                <span className="font-semibold">{coupon}</span> applied
                successfully.
              </p>
            </div>

            <div className="rounded-full bg-green-600 text-white px-4 py-2 text-sm font-semibold">
              {discount}% OFF
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CouponCard;
