import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

function AdminCharts({ orders }) {
  const monthlyRevenue = {};

  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalAmount;
  });

  const revenueData = {
    labels: Object.keys(monthlyRevenue),

    datasets: [
      {
        label: "Revenue",
        data: Object.values(monthlyRevenue),
      },
    ],
  };

  const statusCounts = {
    Pending: 0,
    Confirmed: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((order) => {
    statusCounts[order.status]++;
  });

  const statusData = {
    labels: Object.keys(statusCounts),

    datasets: [
      {
        data: Object.values(statusCounts),
      },
    ],
  };

  return (
    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-8
      mb-10
      "
    >
      <div className="border p-5 rounded">
        <h2 className="text-xl mb-4">Revenue</h2>

        <Bar data={revenueData} />
      </div>

      <div className="border p-5 rounded">
        <h2 className="text-xl mb-4">Order Status</h2>

        <Doughnut data={statusData} />
      </div>
    </div>
  );
}

export default AdminCharts;
