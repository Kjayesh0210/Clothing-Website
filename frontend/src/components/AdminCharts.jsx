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
        backgroundColor: "#3B82F6",
        borderRadius: 10,
        borderSkipped: false,
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
        backgroundColor: [
          "#FACC15", // Pending
          "#3B82F6", // Confirmed
          "#8B5CF6", // Shipped
          "#22C55E", // Delivered
          "#EF4444", // Cancelled
        ],
        borderWidth: 0,
        hoverOffset: 12,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    cutout: "70%",
  };

  return (
    <div className="mb-10 grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">Revenue</h2>

        <div className="h-64 sm:h-72">
          <Bar data={revenueData} options={barOptions} />
        </div>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">Order Status</h2>

        <div className="h-64 sm:h-72">
          <Doughnut data={statusData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}

export default AdminCharts;
