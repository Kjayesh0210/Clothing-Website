import { useEffect, useState } from "react";

import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/orders/myorders", {
      headers: {
        Authorization: token,
      },
    });

    setOrders(res.data);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
            border
            p-4
            mt-4"
        >
          <h2>₹{order.totalAmount}</h2>

          <p>{order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
