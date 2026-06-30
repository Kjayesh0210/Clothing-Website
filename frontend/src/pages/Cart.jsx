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
    <section className="min-h-screen bg-[#F8F8F8] py-16">
      <div className="mx-auto w-full px-8 lg:px-16">
        {/* Header */}
        <div className="h-5"></div>
        <div className="flex p-6">
          <div className="w-10"></div>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Shopping
              </p>

              <h1 className="mt-3 text-5xl font-bold tracking-tight text-neutral-900">
                Shopping Bag
              </h1>

              <p className="mt-4 text-lg text-neutral-500">
                {cart.products.length}{" "}
                {cart.products.length === 1 ? "Item" : "Items"} in your bag
              </p>
            </div>
          </div>
        </div>
        <div className="h-5"></div>

        {/* Content */}
        <div className="grid gap-10 lg:grid-cols-[1px_1fr_420px_1px]">
          {/* Cart Items */}
          <div className="col-start-2 flex flex-col gap-8">
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
          <aside className="lg:sticky lg:top-28 h-fit col-start-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
              />
            </div>
          </aside>
        </div>
        <div className="h-10"></div>
      </div>
    </section>
  );
}

export default Cart;
