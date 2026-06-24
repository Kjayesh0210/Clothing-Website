import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { Link } from "react-router-dom";
function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/orders/myorders", {
        headers: {
          Authorization: token,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success(res.data.message);

      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        [...Array(4)].map((_, index) => (
          <div
            key={index}
            className="
      border
      p-4
      mt-4
      rounded
      animate-pulse
      "
          >
            <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>

            <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>

            <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>

            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        ))
      ) : orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="
    border
    p-4
    mt-4
    rounded
    hover:shadow-md
    transition
    "
          >
            <Link to={`/orders/${order._id}`}>
              <div className="cursor-pointer">
                <h2 className="text-xl font-semibold">₹{order.totalAmount}</h2>

                <p>Status: {order.status}</p>

                <p>
                  Payment:
                  {order.isPaid ? " Paid" : " Pending"}
                </p>
              </div>
            </Link>

            {(order.status === "Pending" || order.status === "Confirmed") && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="
        mt-4
        bg-red-500
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded
        "
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
