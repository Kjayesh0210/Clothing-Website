import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";
import OrderTimeline from "../components/OrderTimeline";
import toast from "react-hot-toast";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/orders/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    setOrder(res.data);
  };

  const cancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/orders/${order._id}/cancel`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success(res.data.message);

      fetchOrder();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const requestReturn = async () => {
    if (!reason.trim()) {
      return toast.error("Please enter a reason");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/orders/${order._id}/request-return`,
        {
          reason,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success(res.data.message);

      fetchOrder();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  if (!order) return <h1>Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Order Details</h1>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 border rounded-xl p-6 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <span
              className={`
              px-4
              py-1
              rounded-full
              text-sm
              font-medium
              ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }
            `}
            >
              {order.status}
            </span>
          </div>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Total Amount:</span> ₹
              {order.totalAmount}
            </p>

            <p>
              <span className="font-semibold">Payment:</span>
              {order.isPaid ? " Paid" : " Unpaid"}
            </p>

            <p>
              <span className="font-semibold">Payment ID:</span>{" "}
              {order.paymentId}
            </p>

            <p>
              <span className="font-semibold">Delivery Address:</span>{" "}
              {order.address}
            </p>

            {order.status !== "Delivered" &&
              order.status !== "Cancelled" &&
              order.estimatedDelivery && (
                <p>
                  <span className="font-semibold">Delivery By:</span>{" "}
                  {new Date(order.estimatedDelivery).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                    },
                  )}
                </p>
              )}
          </div>

          {(order.status === "Pending" || order.status === "Confirmed") && (
            <button
              onClick={cancelOrder}
              className="
            mt-6
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-2
            rounded-lg
            transition
            "
            >
              Cancel Order
            </button>
          )}
        </div>

        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>

          <OrderTimeline status={order.status} />
        </div>
      </div>

      {order.status === "Delivered" && !order.returnRequest?.requested && (
        <div className="border rounded-xl p-6 shadow-sm bg-white mb-8">
          <h2 className="text-xl font-semibold mb-4">Request Return</h2>

          <textarea
            placeholder="Tell us why you want to return this order..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="
            border
            rounded-lg
            p-3
            w-full
            h-32
            resize-none
            mb-4
            "
          />

          <button
            onClick={requestReturn}
            className="
            bg-black
            text-white
            px-5
            py-2
            rounded-lg
            "
          >
            Submit Request
          </button>
        </div>
      )}

      {order.returnRequest?.requested && (
        <div
          className="
        border
        rounded-xl
        p-6
        shadow-sm
        bg-gray-50
        mb-8
        "
        >
          <h2 className="text-xl font-semibold mb-4">Return Request</h2>

          <p className="mb-2">
            <span className="font-semibold">Reason:</span>{" "}
            {order.returnRequest.reason}
          </p>

          <p>
            <span className="font-semibold">Status:</span>{" "}
            {order.returnRequest.status}
          </p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-5">Ordered Products</h2>

      <div className="space-y-4">
        {order.products.map((item) => (
          <div
            key={`${item.product._id}-${item.size}`}
            className="
          border
          rounded-xl
          p-4
          flex
          gap-5
          items-center
          hover:shadow-md
          transition
          bg-white
          "
          >
            <img
              src={item.product.images?.[0]}
              alt={item.product.title}
              loading="lazy"
              className="
            w-24
            h-24
            object-cover
            rounded-lg
            "
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.product.title}</h3>

              <p className="text-gray-500">Category: {item.product.category}</p>

              <div className="flex gap-6 mt-2 text-sm text-gray-700">
                <p>Price: ₹{item.product.price}</p>

                <p>Size: {item.size || "N/A"}</p>

                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
