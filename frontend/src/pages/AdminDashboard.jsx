import { useEffect, useState } from "react";

import api from "../services/api";
import AdminCharts from "../components/AdminCharts";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  useEffect(() => {
    fetchOrders();
    fetchStats();
    fetchLowStockProducts();
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
      const res = await api.get("/products/low-stock");

      setLowStockProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-4xl mb-5">Admin Dashboard</h1>
      {stats && (
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
    gap-5
    mb-10
    "
        >
          <div
            className="
      border
      rounded
      p-5
      "
          >
            <h3 className="text-gray-500">Revenue</h3>

            <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
          </div>

          <div
            className="
      border
      rounded
      p-5
      "
          >
            <h3 className="text-gray-500">Orders</h3>

            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>

          <div
            className="
      border
      rounded
      p-5
      "
          >
            <h3 className="text-gray-500">Products</h3>

            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>

          <div
            className="
      border
      rounded
      p-5
      "
          >
            <h3 className="text-gray-500">Users</h3>

            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
      )}
      <AdminCharts orders={orders} />
      {lowStockProducts.length > 0 && (
        <div
          className="
    border
    border-red-500
    p-5
    rounded
    mb-10
    "
        >
          <h2
            className="
      text-2xl
      text-red-500
      mb-4
      "
          >
            Low Stock Alert
          </h2>

          {lowStockProducts.map((product) => (
            <div
              key={product._id}
              className="
          flex
          justify-between
          border-b
          py-2
          "
            >
              <span>{product.title}</span>

              <span>Stock: {product.stock}</span>
            </div>
          ))}
        </div>
      )}
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
