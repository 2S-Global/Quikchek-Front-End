import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const ReportDetails = () => {
  const [payments, setPayments] = useState([
    {
      _id: "689435f5fcdb70e0c6b478b2",
      name: "Abhishek Dey",
      ownerDetails: {
        name: "owner 1",

        FlatNo: "A-201",
      },
      date: "2025-05-13T09:31:31.612+00:00",
      amount: "",
      status: "",
    },
  ]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");

  return (
    <>
      <MessageComponent error={error} success={success} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Owner Details</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={payment._id}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{payment.name}</td>
                      <td style={{ textAlign: "center" }}>
                        {payment.ownerDetails
                          ? `${payment.ownerDetails.name || "N/A"} (${payment.ownerDetails.FlatNo || "N/A"})`
                          : ""}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {(() => {
                          const d = new Date(payment.date);
                          const day = String(d.getDate()).padStart(2, "0");
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = d.getFullYear();
                          const hours = String(d.getHours()).padStart(2, "0");
                          const minutes = String(d.getMinutes()).padStart(
                            2,
                            "0"
                          );
                          return `${day}-${month}-${year} ${hours}:${minutes}`;
                        })()}
                      </td>
                      <td style={{ textAlign: "center" }}></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ReportDetails;
