import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
const TopCardBlock = () => {
  const [totalpayments, setTotalpayments] = useState(0);
  const [totalactiveverification, setTotalactiveverification] = useState(0);
  const [totalpendingverification, setTotalpendingverification] = useState(0);
  const [totalplan, setTotalplan] = useState(0);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("Admin_token");

  const fetchData = async () => {
    /* /api/dashboard/getTotalFrontend
post  */
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/dashboard/getTotalFrontend`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setTotalpayments(response.data.totalTransactionAmount);
        setTotalactiveverification(response.data.totalActiveVerification);
        setTotalpendingverification(response.data.totalPendingVerifications);
        setTotalplan(response.data.totalSelectedPlans);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardContent = [
    {
      id: 1,
      icon: "la-credit-card", // For Total Payments
      countNumber: totalpayments,
      metaName: "Total Payments",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-check-circle", // For Active Verification
      countNumber: totalactiveverification,
      metaName: "Active Verification",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-hourglass-half", // For Pending Verification
      countNumber: totalpendingverification,
      metaName: "Pending Verification",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-id-badge", // For Active Plans
      countNumber: totalplan,
      metaName: "Active Plans",
      uiClass: "ui-green",
    },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i
                className={`icon la ${item.icon}`}
                style={{ height: "37px", width: "31px", lineHeight: "25px" }}
              ></i>
            </div>
            <div className="right">
              <h4>
                {(item.metaName === "Total Payments" ||
                  item.metaName === "Wallet Balance") && (
                  <span>&#8377;&nbsp;</span>
                )}
                {item.countNumber}
              </h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
