import { useEffect, useState } from "react";

import api from "../services/api";
import { Link } from "react-router-dom";
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
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <Link key={order._id} to={`/orders/${order._id}`}>
            <div
              className="
            border
            p-4
            mt-4
            rounded
            hover:shadow-md
            transition
            cursor-pointer
            "
            >
              <h2 className="text-xl font-semibold">₹{order.totalAmount}</h2>

              <p>Status: {order.status}</p>

              <p>
                Payment:
                {order.isPaid ? " Paid" : " Pending"}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default MyOrders;
