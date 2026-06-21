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
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-4xl mb-5">Admin Dashboard</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
        border
        p-5
        mb-4
        rounded
        flex
        flex-col
        md:flex-row
        justify-between
        gap-4
        "
        >
          <div>
            <h2 className="font-semibold break-all">Order: {order._id}</h2>

            <p className="break-all">User: {order.user?.email}</p>

            <p>₹{order.totalAmount}</p>

            <p>Status: {order.status}</p>
          </div>

          <div>
            <select
              value={order.status}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="
            border
            p-2
            w-full
            md:w-auto
            "
            >
              <option>Pending</option>

              <option>Confirmed</option>

              <option>Shipped</option>

              <option>Delivered</option>

              <option>Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
