import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import CartSkeleton from "../components/cart/CartSkeleton";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const { fetchCartCount } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: token,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity, size) => {
    if (quantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      await api.put(
        "/cart/update",
        {
          productId,
          quantity,
          size,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      await fetchCartCount();
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete("/cart/remove", {
        headers: {
          Authorization: token,
        },
        data: {
          productId,
          size,
        },
      });

      await fetchCartCount();
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <CartSkeleton />;
  }

  if (!cart || cart.products.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cart.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 999 ? 0 : 99;

  const discount = 0;

  const total = subtotal + shipping - discount;

  return (
    <section className="min-h-screen bg-[#F8F8F8] py-8 md:py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-8 md:mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 sm:text-sm">
            Shopping
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-neutral-500 sm:text-base lg:text-lg">
            {cart.products.length}{" "}
            {cart.products.length === 1 ? "Item" : "Items"} in your bag
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
          {/* Cart Items */}
          <div className="flex flex-col gap-6 md:gap-6">
            {cart.products.map((item) => (
              <CartItem
                key={`${item.product._id}-${item.size}`}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
