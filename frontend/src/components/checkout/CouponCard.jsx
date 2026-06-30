import { TicketPercent, CheckCircle, ArrowRight, Copy } from "lucide-react";
import toast from "react-hot-toast";

function CouponCard({ coupon, setCoupon, applyCoupon, discount }) {
  const offers = [
    {
      code: "SAVE10",
      discount: "10% OFF",
      description: "Orders above ₹999",
    },
    {
      code: "SAVE20",
      discount: "20% OFF",
      description: "Orders above ₹1999",
    },
    {
      code: "FREESHIP",
      discount: "FREE",
      description: "Free Shipping",
    },
  ];

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`${code} copied`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <TicketPercent
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
          />

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

      <div>
        <h3 className="font-semibold text-lg mb-4">Popular Coupons</h3>

        <div className="grid md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.code}
              className="
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-5
                transition
                hover:shadow-lg
                hover:-translate-y-1
              "
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{offer.code}</h4>

                  <p className="text-sm text-neutral-500 mt-2">
                    {offer.description}
                  </p>
                </div>

                <span className="text-xs bg-neutral-100 rounded-full px-3 py-1 font-semibold">
                  {offer.discount}
                </span>
              </div>

              <button
                onClick={() => copyCoupon(offer.code)}
                className="
                  mt-5
                  w-full
                  h-11
                  rounded-xl
                  border
                  border-neutral-200
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-neutral-100
                  transition
                "
              >
                <Copy size={16} />
                Copy Code
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CouponCard;
