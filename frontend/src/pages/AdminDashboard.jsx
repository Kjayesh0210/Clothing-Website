import { useEffect, useState } from "react";
import api from "../services/api";
import AdminCharts from "../components/AdminCharts";

import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("orders");
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      setLoading(true);

      await Promise.all([fetchOrders(), fetchStats(), fetchLowStockProducts()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/all", {
        headers: {
          Authorization: token,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/admin/stats", {
        headers: {
          Authorization: token,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLowStockProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/products/low-stock", {
        headers: {
          Authorization: token,
        },
      });

      console.log(res.data);

      setLowStockProducts(res.data);
    } catch (error) {
      console.log(error);
    }
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

  const card =
    "rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm transition hover:shadow-lg";

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10">
        <div className="max-w-7xl mx-auto px-6 animate-pulse">
          <div className="h-10 w-72 bg-neutral-200 rounded" />

          <div className="h-5 w-96 bg-neutral-200 rounded mt-4" />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  bg-white
                  rounded-3xl
                  h-40
                  border
                  border-neutral-200
                "
              />
            ))}
          </div>

          <div className="mt-10 h-96 rounded-3xl bg-white border border-neutral-200" />

          <div className="mt-10 space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  bg-white
                  rounded-3xl
                  h-56
                  border
                  border-neutral-200
                "
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="mb-4">
          <h1 className="text-5xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="text-lg text-neutral-500 mt-2">
            Monitor revenue, orders, inventory and customer activity.
          </p>
        </div>

        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {/* Revenue */}
            <div className={card}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 sm:text-sm">
                    Total Revenue
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl lg:text-3xl">
                    ₹{stats.totalRevenue}
                  </h2>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className={card}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 sm:text-sm">
                    Total Orders
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl lg:text-3xl">
                    {stats.totalOrders}
                  </h2>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={card}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <Package className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 sm:text-sm">
                    Products
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl lg:text-3xl">
                    {stats.totalProducts}
                  </h2>
                </div>
              </div>
            </div>

            {/* Users */}
            <div className={card}>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium uppercase tracking-wide text-neutral-500 sm:text-sm">
                    Registered Users
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl lg:text-3xl">
                    {stats.totalUsers}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="
          bg-neutral-50
          rounded
          py-0
        "
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Sales Analytics</h2>

              <p className="text-neutral-500 mt-2">Revenue and order trends.</p>
            </div>
          </div>

          <AdminCharts orders={orders} />
        </div>

        <div className="mb-10 flex justify-center">
          <div
            className="
            inline-flex
            items-center
            rounded-2xl
            border
            border-neutral-200
            bg-white
            shadow-sm
          "
          >
            <button
              onClick={() => setActiveSection("orders")}
              className={`
                h-10
                min-w-[140px]
                rounded-xl
                px-6
                py-3
                text-sm
                font-semibold
                transition-all
                duration-300
              ${
                activeSection === "orders"
                  ? "bg-black text-white shadow-md"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
              }
            `}
            >
              Orders
            </button>

            <button
              onClick={() => setActiveSection("stock")}
              className={`
                h-10
                min-w-[140px]
                rounded-xl
                px-6
                py-3
                text-sm
                font-semibold
                transition-all
                duration-300
                ${
                  activeSection === "stock"
                    ? "bg-black text-white shadow-md"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                }
              `}
            >
              Low Stock
            </button>
          </div>
        </div>

        {activeSection === "stock" && lowStockProducts.length > 0 && (
          <div className="mb-12 rounded-3xl border border-red-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <AlertTriangle className="h-6 w-6 text-red-600 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Low Stock Inventory
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500 sm:text-base">
                    These products need attention before they run out of stock.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                {lowStockProducts.length} Product
                {lowStockProducts.length > 1 ? "s" : ""}
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
              {lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-36 overflow-hidden bg-neutral-100 sm:h-44">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">
                          {product.title}
                        </h3>

                        <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                          Inventory Alert
                        </p>
                      </div>

                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        LOW
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {product.sizes
                        ?.filter((size) => size.stock >= 0 && size.stock <= 5)
                        .map((size) => (
                          <div
                            key={size.size}
                            className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-1.5"
                          >
                            <span className="text-sm font-medium">
                              Size {size.size}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                size.stock <= 2
                                  ? "bg-red-500 text-white"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {size.stock} left
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = getStatus(order.status);
              const StatusIcon = status.icon;

              return (
                <div
                  key={order._id}
                  className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-4 lg:p-4"
                >
                  <div className="flex flex-col gap-4 xl:flex-row">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                          ₹{order.totalAmount}
                        </h2>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${status.color}`}
                        >
                          <StatusIcon size={18} />
                          {order.status}
                        </span>

                        <span
                          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Pending Payment"}
                        </span>
                      </div>

                      {/* Order Details */}
                      <div className="mt-2 grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-neutral-500">Order ID</p>
                          <p className="mt-2 break-all font-semibold">
                            {order._id}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-neutral-500">Customer</p>
                          <p className="mt-2 break-all font-semibold">
                            {order.user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Products */}
                      <div className="mt-2">
                        <h3 className="mb-5 text-xl font-bold">
                          Ordered Products
                        </h3>

                        <div className="space-y-3">
                          {order.products?.map((item) => (
                            <div
                              key={`${item.product?._id}-${item.size}`}
                              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                  <h4 className="font-semibold">
                                    {item.product?.title}
                                  </h4>

                                  <p className="mt-1 text-sm text-neutral-500">
                                    Size {item.size}
                                  </p>
                                </div>

                                <div className="text-right">
                                  <p className="text-sm text-neutral-500">
                                    Quantity
                                  </p>

                                  <p className="font-semibold">
                                    × {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="xl:w-72 xl:border-l xl:border-neutral-200 xl:pl-8">
                      <h3 className="text-xl font-bold">Update Status</h3>

                      <p className="mt-2 text-sm text-neutral-500">
                        Keep customers updated by changing the order status.
                      </p>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        className="mt-4 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>

                      <div className="mt-4 rounded-2xl bg-neutral-100 p-5">
                        <p className="text-sm font-medium text-neutral-500">
                          Current Status
                        </p>

                        <div
                          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${status.color}`}
                        >
                          <StatusIcon size={18} />
                          {order.status}
                        </div>
                      </div>
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

export default AdminDashboard;
