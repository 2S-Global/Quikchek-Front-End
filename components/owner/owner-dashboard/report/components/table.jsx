"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const Companytable = ({ startDate, endDate }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Owner_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setErrorId(Date.now());
      return;
    }

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${apiurl}/api/pdf/report-table`,
          {
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setCompanies(response.data.table_data || []);
          setSuccess(
            response.data.message || "Report data loaded successfully."
          );
          setMessage_id(Date.now());
        } else {
          setErrorId(Date.now());
          setError(response.data.message || "Failed to load data.");
        }
      } catch (err) {
        setErrorId(Date.now());
        setError("Error fetching report data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [startDate, endDate]);

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="widget-content mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-light">
                <tr>
                  <th className="text-center">S/N</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Customer Details</th>
                  <th className="text-center">Amount (₹)</th>
                  <th className="text-center">GST (₹)</th>
                  <th className="text-center">Invoice Number</th>
                </tr>
              </thead>
              <tbody>
                {companies.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No records found
                    </td>
                  </tr>
                ) : (
                  companies.map((company, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">
                        {new Date(company.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="text-start">
                        <strong>Name:</strong> {company.customer_name} <br />
                        <strong>Email:</strong> {company.customer_email} <br />
                        <strong>Address:</strong>{" "}
                        {company.customer_address?.replace(/\n/g, ", ")} <br />
                        <strong>GST:</strong> {company.customer_gst}
                      </td>
                      <td className="text-center">₹ {company.amount}</td>
                      <td className="text-center">₹ {company.gst}</td>
                      <td className="text-center">{company.invoice_no}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Companytable;
