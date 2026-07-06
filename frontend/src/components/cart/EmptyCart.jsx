import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

function EmptyCart() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-neutral-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 sm:h-24 sm:w-24">
          <ShoppingBag size={44} className="text-neutral-600" />
        </div>

        <h2 className="mt-8 text-2xl font-bold text-neutral-900 sm:text-3xl">
          Your Shopping Bag is Empty
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
          Looks like you haven't added anything to your bag yet. Discover our
          latest collection and find something you'll love.
        </p>

        <Link
          to="/products"
          className="mx-auto mt-8 flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 sm:h-14 sm:text-base"
        >
          Continue Shopping
          <ArrowRight size={20} />
        </Link>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl">🚚</span>
            <p className="mt-3 text-xs text-neutral-600 sm:text-sm">
              Fast Delivery
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl">↩️</span>
            <p className="mt-3 text-xs text-neutral-600 sm:text-sm">
              Easy Returns
            </p>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl">🔒</span>
            <p className="mt-3 text-xs text-neutral-600 sm:text-sm">
              Secure Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
