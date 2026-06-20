import { useState } from "react";

import api from "../services/api";

function Checkout() {
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    await api.post(
      "/orders/place",
      {
        address,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    alert("Order Placed");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Checkout</h1>

      <textarea
        rows="5"
        className="
        border
        w-full
        p-3"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        onClick={placeOrder}
        className="
        bg-black
        text-white
        px-6
        py-3
        mt-5"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
