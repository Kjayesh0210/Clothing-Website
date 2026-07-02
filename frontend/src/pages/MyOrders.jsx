import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  CreditCard,
  ArrowRight,
} from "lucide-react";

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

  const getStatus = (status) => {
    switch (status) {
      case "Pending":
        return {
          icon: Clock3,
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };

      case "Confirmed":
        return {
          icon: Package,
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };

      case "Shipped":
        return {
          icon: Truck,
          color: "bg-indigo-100 text-indigo-700 border-indigo-200",
        };

      case "Delivered":
        return {
          icon: CheckCircle2,
          color: "bg-green-100 text-green-700 border-green-200",
        };

      case "Cancelled":
        return {
          icon: XCircle,
          color: "bg-red-100 text-red-700 border-red-200",
        };

      default:
        return {
          icon: Clock3,
          color: "bg-neutral-100 text-neutral-700 border-neutral-200",
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 w-60 rounded bg-neutral-200" />

            <div className="h-5 w-80 rounded bg-neutral-200 mt-4" />

            <div className="space-y-6 mt-10">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-neutral-200
                    p-8
                  "
                >
                  <div className="flex justify-between">
                    <div className="space-y-4">
                      <div className="h-6 w-40 rounded bg-neutral-200" />

                      <div className="h-4 w-56 rounded bg-neutral-200" />

                      <div className="h-4 w-36 rounded bg-neutral-200" />
                    </div>

                    <div className="h-10 w-28 rounded-full bg-neutral-200" />
                  </div>

                  <div className="mt-8 flex justify-between">
                    <div className="h-12 w-36 rounded-xl bg-neutral-200" />

                    <div className="h-12 w-40 rounded-xl bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const canCancel = (status) => status === "Pending" || status === "Confirmed";
  return (
    <div className="min-h-screen w-full bg-neutral-50 flex justify-center">
      <div className="max-w-6xl w-full px-4">
        <div className="h-10"></div>
        <div className="mb-16">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
              <ShoppingBag size={28} />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>

              <p className="text-neutral-500 mt-2">
                Track your purchases and manage your recent orders.
              </p>
            </div>
          </div>
          <div className="h-5"></div>
        </div>

        {orders.length === 0 ? (
          <div
            className="
            bg-white
            rounded-3xl
            border
            border-neutral-200
            shadow-sm
            p-16
            text-center
          "
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
              <ShoppingBag size={42} className="text-neutral-500" />
            </div>

            <h2 className="mt-8 text-3xl font-bold">No Orders Yet</h2>

            <p className="mt-4 text-neutral-500 max-w-md mx-auto leading-7">
              Looks like you haven't placed your first order yet. Discover our
              latest collection and start shopping.
            </p>

            <Link
              to="/products"
              className="
              mt-10
              inline-flex
              items-center
              gap-2
              bg-black
              text-white
              px-8
              h-14
              rounded-2xl
              font-semibold
              hover:bg-neutral-800
              transition
            "
            >
              Continue Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="gap-4 flex flex-col">
            {orders.map((order) => {
              const status = getStatus(order.status);

              const StatusIcon = status.icon;

              return (
                <div
                  key={order._id}
                  className="
                  bg-white
                  rounded-3xl
                  border
                  border-neutral-200
                  shadow-sm
                  hover:shadow-lg
                  transition-all
                  duration-300
                  p-8
                "
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                    <div></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4">
                        <h2 className="text-3xl font-bold">
                          ₹{order.totalAmount}
                        </h2>

                        <div
                          className={`
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-full
                          border
                          text-sm
                          font-semibold
                          ${status.color}
                        `}
                        >
                          <StatusIcon size={18} />

                          {order.status}
                        </div>

                        <div
                          className={`
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                          ${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                        >
                          <CreditCard size={16} />

                          {order.isPaid ? "Paid" : "Pending"}
                        </div>
                      </div>

                      <div className="mt-8 grid sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-neutral-500">Order ID</p>

                          <p className="font-semibold mt-2 break-all">
                            {order._id}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-neutral-500">Ordered On</p>

                          <p className="font-semibold mt-2">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-64 flex flex-col gap-4">
                      <div> </div>
                      <Link
                        to={`/orders/${order._id}`}
                        className="
                        h-14
                        rounded-2xl
                        bg-black
                        text-white
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-neutral-800
                        transition
                      "
                      >
                        View Details
                        <ArrowRight size={18} />
                      </Link>

                      {canCancel(order.status) && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="
                          h-14
                          rounded-2xl
                          border-2
                          border-red-200
                          text-red-600
                          font-semibold
                          hover:bg-red-50
                          transition
                        "
                        >
                          Cancel Order
                        </button>
                      )}
                      <div> </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
