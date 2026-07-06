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

  const downloadInvoice = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/orders/${order._id}/invoice`, {
        headers: {
          Authorization: token,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = `THREADDOT-Invoice-${order._id}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 border rounded-xl p-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded w-40 mt-6"></div>
          </div>

          <div className="border rounded-xl p-6">
            <div className="h-8 bg-gray-200 rounded w-40 mb-6"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="h-8 bg-gray-200 rounded w-56 mb-5"></div>

        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="
          border
          rounded-xl
          p-4
          flex
          gap-5
          items-center
          mb-4
          "
          >
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>

            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-48 mb-3"></div>

              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>

              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Order Details
          </h1>

          <p className="mt-3 text-sm text-neutral-500 sm:text-base lg:text-lg">
            View your order summary, delivery progress and purchased items.
          </p>
        </div>

        {/* Summary + Timeline */}
        <div className="mb-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Summary */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Order Summary</h2>

                <p className="mt-2 break-all text-sm text-neutral-500">
                  Order ID #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <span
                className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="my-8 border-t border-neutral-200" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Total Amount</span>

                <span className="text-2xl font-bold sm:text-3xl">
                  ₹{order.totalAmount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-neutral-500">Payment</span>

                <span
                  className={`font-semibold ${
                    order.isPaid ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <span className="text-neutral-500">Payment ID</span>

                <span className="break-all font-medium text-neutral-800">
                  {order.paymentId || "-"}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <span className="shrink-0 text-neutral-500">
                  Delivery Address
                </span>

                <span className="font-medium leading-7 sm:text-right">
                  {order.address}
                </span>
              </div>

              {order.status !== "Delivered" &&
                order.status !== "Cancelled" &&
                order.estimatedDelivery && (
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <span className="text-neutral-500">Estimated Delivery</span>

                    <span className="font-semibold">
                      {new Date(order.estimatedDelivery).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {(order.status === "Pending" || order.status === "Confirmed") && (
                <button
                  onClick={cancelOrder}
                  className="h-14 rounded-2xl border-2 border-red-200 px-8 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Cancel Order
                </button>
              )}

              <button
                onClick={downloadInvoice}
                className="h-14 rounded-2xl bg-black px-8 font-semibold text-white transition hover:bg-neutral-800"
              >
                Download Invoice
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Order Tracking</h2>

            <p className="mb-8 mt-2 text-neutral-500">
              Track your order status in real time.
            </p>

            <OrderTimeline status={order.status} />
          </div>
        </div>

        {/* Return Request */}
        {order.status === "Delivered" && !order.returnRequest?.requested && (
          <div className="mb-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Request a Return
              </h2>

              <p className="mt-3 leading-7 text-neutral-500">
                If you're not completely satisfied with your purchase, let us
                know the reason for your return request.
              </p>

              <textarea
                placeholder="Tell us why you want to return this order..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-6 h-40 w-full resize-none rounded-2xl border border-neutral-300 p-5 outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
              />

              <button
                onClick={requestReturn}
                className="mt-6 h-14 rounded-2xl bg-black px-8 font-semibold text-white transition hover:bg-neutral-800"
              >
                Submit Return Request
              </button>
            </div>
          </div>
        )}

        {/* Return Status */}
        {order.returnRequest?.requested && (
          <div className="mb-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Return Request
                </h2>

                <p className="mt-2 text-neutral-500">
                  Your request has been submitted successfully.
                </p>
              </div>

              <span className="inline-flex w-fit items-center rounded-full bg-yellow-100 px-5 py-2 font-semibold text-yellow-700">
                {order.returnRequest.status}
              </span>
            </div>

            <div className="my-8 border-t border-neutral-200" />

            <div>
              <p className="mb-2 text-neutral-500">Reason</p>
              <p className="leading-7">{order.returnRequest.reason}</p>
            </div>
          </div>
        )}

        {/* Products */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Ordered Products</h2>

          <p className="mt-2 text-neutral-500">
            Products included in this order.
          </p>
        </div>

        <div className="space-y-6">
          {order.products.map((item) => (
            <div
              key={`${item.product._id}-${item.size}`}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div className="flex flex-row-reverse gap-4 sm:flex-row sm:gap-6">
                <img
                  src={item.product.images?.[0]}
                  alt={item.product.title}
                  loading="lazy"
                  className="h-28 w-24 shrink-0 rounded-2xl bg-neutral-100 object-cover sm:h-32 sm:w-32"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold sm:text-2xl">
                    {item.product.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {item.product.category}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
                      ₹{item.product.price}
                    </span>

                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
                      Size {item.size || "N/A"}
                    </span>

                    <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium">
                      Qty {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
