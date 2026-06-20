import { useEffect, useState } from "react";

import api from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/orders/all", {
      headers: {
        Authorization: token,
      },
    });

    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await api.put(
      `/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    fetchOrders();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-5">Admin Dashboard</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
                border
                p-5
                mb-4"
        >
          <h2>
            Order:
            {order._id}
          </h2>

          <p>
            User:
            {order.user?.email}
          </p>

          <p>₹{order.totalAmount}</p>

          <p>{order.status}</p>

          <select onChange={(e) => updateStatus(order._id, e.target.value)}>
            <option>Pending</option>

            <option>Confirmed</option>

            <option>Shipped</option>

            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
