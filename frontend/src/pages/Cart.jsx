import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/cart", {
      headers: {
        Authorization: token,
      },
    });

    console.log(res.data);

    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity, size) => {
    if (quantity < 1) return;

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

    fetchCart();
  };

  const removeItem = async (productId, size) => {
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

    fetchCart();
  };

  if (!cart) {
    return <h1>Empty Cart</h1>;
  }

  const total =
    cart?.products?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">My Cart</h1>

      {cart.products.map((item) => (
        <div
          key={`${item.product._id}-${item.size}`}
          className="
          flex
          justify-between
          items-center
          border-b
          py-4
          "
        >
          <div>
            <h2>{item.product.title}</h2>

            <p>Size: {item.size}</p>

            <p>₹{item.product.price}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity - 1, item.size)
              }
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.product._id, item.quantity + 1, item.size)
              }
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product._id, item.size)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-10">
        <h2 className="text-3xl">Total: ₹{total}</h2>
      </div>

      <Link
        to="/checkout"
        className="
        bg-black
        text-white
        px-6
        py-3
        mt-5
        inline-block
        "
      >
        Checkout
      </Link>
    </div>
  );
}

export default Cart;
