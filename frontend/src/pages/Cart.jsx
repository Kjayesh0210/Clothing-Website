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
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Shopping Bag</h1>

          <p className="text-neutral-500 mt-2">
            {cart.products.length}{" "}
            {cart.products.length === 1 ? "Item" : "Items"} in your bag
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.products.map((item) => (
              <CartItem
                key={`${item.product._id}-${item.size}`}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
