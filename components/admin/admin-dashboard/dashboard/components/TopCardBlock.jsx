import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
const TopCardBlock = () => {
  const [totalcompany, setTotalcompany] = useState();
  const [totalpayment, setTotalpayment] = useState();
  const [totalactiveverification, setTotalactiveverification] = useState();
  const [totalpendingverification, setTotalpendingverification] = useState();

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("Super_token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiurl}/api/dashboard/getTotal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      if (response.data.success) {
        setTotalcompany(response.data.totalUsers);
        setTotalpayment(response.data.totalTransactionAmount);
        setTotalactiveverification(response.data.totalActiveVerification);
        setTotalpendingverification(response.data.totalPendingVerifications);
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
      icon: "la-building", // Better for "Total Company"
      countNumber: totalcompany,
      metaName: "Total Company",
      uiClass: "ui-green",
    },
    {
      id: 2,
      icon: "la-credit-card", // Better for "Total Payments"
      countNumber: totalpayment,
      metaName: "Total Payments",
      uiClass: "ui-blue",
    },
    {
      id: 3,
      icon: "la-file-alt", // "File/Document" type icon for "Active Verification"
      countNumber: totalactiveverification,
      metaName: "Active Verification",
      uiClass: "ui-red",
    },
    {
      id: 4,
      icon: "la-hourglass-half", // "Pending" feeling for "Pending Verification"
      countNumber: totalpendingverification,
      metaName: "Pending Verification",
      uiClass: "ui-yellow",
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
