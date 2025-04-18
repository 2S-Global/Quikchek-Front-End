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

// Register both Bar and Line elements
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
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
};

const ProfileChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        backgroundColor: "#1967d2",
        borderColor: "#1967d2",
        fill: false,
      },
    ],
  });

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("Super_token");
        const response = await axios.get(
          `${apiurl}/api/dashboard/getMonthlyUserVerifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const labels = response.data.data.map((item) => item.monthName);
          const data = response.data.data.map((item) => item.total);

          setChartData({
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

          setSuccess(true);
        } else {
          setSuccess(false);
          setError(response.data.message || "Failed to load chart data");
        }
      } catch (err) {
        setError(err.message || "Unexpected error");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiurl]);

  return (
    <>
      <div className="row">
        <div className="tabs-box col-md-12">
          <div className="widget-title">
            <h4>Total Verification Statistics</h4>
            <div className="chosen-outer"></div>
          </div>

          <div className="widget-content space-y-6">
            {loading && <p>Loading chart...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
              <>
                <Bar options={options} data={chartData} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileChart;
