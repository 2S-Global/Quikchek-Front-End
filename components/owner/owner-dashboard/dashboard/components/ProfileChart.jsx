"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};

const ProfileChart = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchChartData = async (endpoint, setData) => {
    try {
      const token = localStorage.getItem("Super_token");
      const response = await axios.get(`${apiurl}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch chart data");
      }

      const labels = response.data.data.map((item) => item.monthName);
      const data = response.data.data.map((item) => item.total);

      setData({
        labels,
        datasets: [
          {
            label: "Total",
            data,
            backgroundColor: "#1967d2",
            borderColor: "#1967d2",
            fill: false,
          },
        ],
      });
    } catch (err) {
      setError(err.message || "Unexpected error");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchChartData(
          "/api/dashboard/getMonthlyUserVerifications",
          setChartData
        ),
        fetchChartData("/api/dashboard/getMonthlyUsers", setLineChartData),
      ]);
      setLoading(false);
    };

    fetchAll();
  }, [apiurl]);

  return (
    <div className="row">
      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total Verification Statistics</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <Bar options={options} data={chartData} />
          )}
        </div>
      </div>

      <div className="tabs-box col-md-6">
        <div className="widget-title">
          <h4>Total User Statistics</h4>
        </div>
        <div className="widget-content space-y-6">
          {loading ? (
            <p>Loading chart...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <Line options={options} data={lineChartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileChart;
