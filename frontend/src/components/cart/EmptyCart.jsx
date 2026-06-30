import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

function EmptyCart() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-4">
      <div
        className="
          bg-white
          max-w-lg
          lg:h-114
          w-full
          rounded-3xl
          border
          border-neutral-200
          shadow-sm
          p-100
          text-center
        "
      >
        <div className="h-5"></div>
        <div
          className="
            w-full
            h-24
            mx-auto
            flex
            items-center
            justify-center
          "
        >
          <ShoppingBag size={44} className="text-neutral-600" />
        </div>
        <div className="h-5"></div>
        <h2 className="mt-8 text-3xl font-bold text-neutral-900">
          Your Shopping Bag is Empty
        </h2>
        <div className="h-5"></div>
        <div className="flex">
          <div className="w-10"></div>
          <p className="mt-4 text-neutral-500 leading-7">
            Looks like you haven't added anything to your bag yet. Discover our
            latest collection and find something you'll love.
          </p>
          <div className="w-10"></div>
        </div>

        <div className="h-6"></div>
        <div className="flex justify-center">
          {/* <div className="w-2"></div> */}
          <Link
            to="/products"
            className="
            mt-10
            h-14
            w-100
            rounded-xl
            bg-black
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
            hover:bg-neutral-800
            hover:-translate-y-0.5
          "
          >
            Continue Shopping
            <ArrowRight size={20} />
          </Link>
        </div>
        <div className="h-7"></div>
        <div className="mt-10 flex justify-center gap-8">
          <div
            className="
            h-[100px]
            w-[100px]
            flex
            flex-col
            items-center
            justify-center
          "
          >
            <p className="text-3xl">🚚</p>
            <p className="mt-3 text-sm text-neutral-600">Fast Delivery</p>
          </div>

          <div
            className="
             h-[100px]
            w-[100px]
            flex
            flex-col
            items-center
            justify-center
          "
          >
            <p className="text-3xl">↩️</p>
            <p className="mt-3 text-sm text-neutral-600">Easy Returns</p>
          </div>

          <div
            className="
             h-[100px]
            w-[100px]
            flex
            flex-col
            items-center
            justify-center
          "
          >
            <p className="text-3xl">🔒</p>
            <p className="mt-3 text-sm text-neutral-600">Secure Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
