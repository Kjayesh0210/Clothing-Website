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
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="flex">
        <div className="w-20"></div>
        <div className="mx-auto w-full px-8 xl:px-0">
          <div className="h-10"></div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight">
              Admin Dashboard
            </h1>

            <p className="text-lg text-neutral-500 mt-3">
              Monitor revenue, orders, inventory and customer activity.
            </p>
          </div>
          <div className="h-5"></div>
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              <div
                className="
              bg-white
              rounded-3xl
              border
              border-neutral-200
              shadow-sm
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
              >
                <div className="flex items-center justify-between">
                  <div></div>
                  <div>
                    <p className="text-neutral-500">Total Revenue</p>

                    <h2 className="text-4xl font-bold mt-4">
                      ₹{stats.totalRevenue}
                    </h2>
                  </div>

                  <div
                    className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                "
                  >
                    <IndianRupee size={28} />
                  </div>
                </div>
              </div>

              <div
                className="
              bg-white
              rounded-3xl
              border
              border-neutral-200
              shadow-sm
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
              >
                <div className="flex items-center justify-between">
                  <div></div>
                  <div>
                    <p className="text-neutral-500">Total Orders</p>

                    <h2 className="text-4xl font-bold mt-4">
                      {stats.totalOrders}
                    </h2>
                  </div>

                  <div
                    className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                "
                  >
                    <ShoppingBag size={28} />
                  </div>
                </div>
              </div>

              <div
                className="
              bg-white
              rounded-3xl
              border
              border-neutral-200
              shadow-sm
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
              >
                <div className="flex items-center justify-between">
                  <div></div>
                  <div>
                    <p className="text-neutral-500">Products</p>

                    <h2 className="text-4xl font-bold mt-4">
                      {stats.totalProducts}
                    </h2>
                  </div>

                  <div
                    className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-green-600
                  text-white
                  flex
                  items-center
                  justify-center
                "
                  >
                    <Package size={28} />
                  </div>
                </div>
              </div>

              <div
                className="
              bg-white
              rounded-3xl
              border
              border-neutral-200
              shadow-sm
              p-8
              hover:shadow-lg
              transition-all
              duration-300
            "
              >
                <div className="flex items-center justify-between">
                  <div></div>

                  <div>
                    <p className="text-neutral-500">Registered Users</p>

                    <h2 className="text-4xl font-bold mt-4">
                      {stats.totalUsers}
                    </h2>
                  </div>

                  <div
                    className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-purple-600
                  text-white
                  flex
                  items-center
                  justify-center
                "
                  >
                    <Users size={28} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="h-5"></div>
          <div
            className="
          bg-neutral-50
          rounded
          p-8
          mb-12
        "
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Sales Analytics</h2>

                <p className="text-neutral-500 mt-2">
                  Revenue and order trends.
                </p>
              </div>
            </div>
            <div className="h-5"></div>

            <AdminCharts orders={orders} />
          </div>
          <div className="h-5"></div>

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
              <div className="w-5"></div>

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
          <div className="h-5"></div>

          {activeSection === "stock" && lowStockProducts.length > 0 && (
            <div
              className="
      bg-white
      rounded-[32px]
      border
      border-red-200
      shadow-sm
      p-10
      mb-12
    "
            >
              <div className="h-5"></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div className="flex items-center gap-5">
                  <div className="h-5"></div>

                  <div
                    className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-red-100
                    flex
                    items-center
                    justify-center
                  "
                  >
                    <AlertTriangle size={30} className="text-red-600" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">Low Stock Inventory</h2>

                    <p className="text-neutral-500 mt-2">
                      These products need attention before they run out of
                      stock.
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 rounded-full bg-red-50 border border-red-200 text-red-700 font-semibold">
                  {lowStockProducts.length} Product
                  {lowStockProducts.length > 1 ? "s" : ""}
                </div>
              </div>
              <div className="h-5"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="
                    rounded-xl
                    border
                    border-neutral-200
                    overflow-hidden
                    hover:shadow-lg
                    transition-all
                    duration-300
                    bg-white
                  "
                  >
                    <div className="aspect-square bg-neutral-100 overflow-hidden">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
                      />
                    </div>

                    <div className="p-6">
                      <div className="h-3"></div>
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h3 className="font-bold text-lg line-clamp-2">
                            {product.title}
                          </h3>

                          <p className="text-sm text-neutral-500 mt-2">
                            Inventory Alert
                          </p>
                        </div>

                        <span
                          className="
                          flex
                          items-center
                          justify-center
                          w-10
                          rounded-full
                          bg-red-100
                          text-red-700
                          text-xs
                          font-semibold
                        "
                        >
                          LOW
                        </span>
                      </div>

                      <div className="mt-6 space-y-3">
                        {product.sizes
                          ?.filter((size) => size.stock >= 0 && size.stock <= 5)
                          .map((size) => (
                            <div
                              key={size.size}
                              className="
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              bg-neutral-50
                              px-4
                              py-3
                            "
                            >
                              <span className="font-medium">
                                Size {size.size}
                              </span>

                              <span
                                className={`
                                flex
                                items-center
                                justify-center
                                w-12
                                h-4
                                rounded-full
                                text-sm
                                font-semibold
                                ${
                                  size.stock <= 2
                                    ? "bg-red-500 text-white"
                                    : "bg-orange-100 text-orange-700"
                                }
                              `}
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
            <div className="flex flex-col gap-8">
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
                    p-10
                    mb-8
                    "
                  >
                    <div className="flex flex-col xl:flex-row gap-12">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4">
                          <h2 className="text-4xl font-extrabold tracking-tight">
                            ₹{order.totalAmount}
                          </h2>

                          <div
                            className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-4
                        py-2
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
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                          >
                            {order.isPaid ? "Paid" : "Pending Payment"}
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mt-8">
                          <div>
                            <p className="text-sm text-neutral-500">Order ID</p>

                            <p className="font-semibold mt-2 break-all">
                              {order._id}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-neutral-500">Customer</p>

                            <p className="font-semibold mt-2 break-all">
                              {order.user?.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-10">
                          <h3 className="text-xl font-semibold mb-6">
                            Ordered Products
                          </h3>

                          <div className="space-y-4">
                            {order.products?.map((item) => (
                              <div
                                key={`${item.product?._id}-${item.size}`}
                                className="
                            rounded-2xl
                            border
                            border-neutral-200
                            bg-neutral-50
                            p-5
                          "
                              >
                                <div className="flex flex-wrap justify-between gap-6">
                                  <div>
                                    <h4 className="font-semibold text-lg">
                                      {item.product?.title}
                                    </h4>

                                    <p className="text-neutral-500 mt-2">
                                      Size {item.size}
                                    </p>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-neutral-500">Quantity</p>

                                    <p className="font-semibold text-lg">
                                      × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div
                        className="
                    xl:w-72
                    xl:border-l
                    xl:pl-8
                    border-neutral-200
                  "
                      >
                        <h3 className="text-xl font-bold">Update Status</h3>

                        <p className="text-neutral-500 mt-2">
                          Keep customers updated by changing the order status.
                        </p>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-neutral-300
                      bg-white
                      px-5
                      mt-8
                      outline-none
                      transition
                      focus:border-black
                      focus:ring-4
                      focus:ring-neutral-100
                    "
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>

                        <div
                          className="
                      mt-10
                      rounded-2xl
                      bg-neutral-100
                      p-6
                    "
                        >
                          <p className="font-semibold">Current Status</p>

                          <div
                            className={`
                        inline-flex
                        items-center
                        gap-2
                        mt-4
                        rounded-full
                        border
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        ${status.color}
                      `}
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
          <div className="h-5"></div>
        </div>
        <div className="w-20"></div>
      </div>
    </div>
  );
}

export default AdminDashboard;
