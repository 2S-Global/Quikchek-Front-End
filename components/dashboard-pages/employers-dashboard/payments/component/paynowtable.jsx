// PaymentDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import styles from "./paynowtable.module.css";
import DatePickerComponent from "../component/DatePickerComponent"; // Import the DatePickerComponent
import { format } from "date-fns";
import { Trash2, FileText } from "lucide-react";
import { Search, X } from "lucide-react";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [paymentmethod, setPaymentmethod] = useState("");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [showSearch, setShowSearch] = useState(false);
  const [startDate, setStartDate] = useState(null); // Initialize as null
  const [endDate, setEndDate] = useState(null); // Initialize as null
  const [errorId, setErrorId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("Admin_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchPayments();
    }
  }, [token]);

  const fetchPayments = async (filters = {}) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${apiurl}/api/usercart/list_all_transaction_company`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPayments(response.data.data);
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByDate = () => {
    setError(null);
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      setErrorId(Date.now());
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date.");
      setErrorId(Date.now());
      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      setErrorId(Date.now());
      return;
    }

    // Format dates as dd-MM-yyyy
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    fetchPayments({
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
  };


  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setError(null);
    setShowSearch(false); 
    fetchPayments();
  };
  
  const handledownload = async (id, name) => {
    console.log("Downloading invoice for payment ID:", id);
    setLoadingRowId(id);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `https://quikchek-backend.onrender.com/api/pdf/invoice-pdf`,
        { order_id: id },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${name}_INVOICE.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSuccess("PDF downloaded successfully!");
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Failed to download PDF. Please try again.");
    } finally {
      setLoadingRowId(null);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <MessageComponent error={error} success={success} errorId={errorId} />
      <div className="container">
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X /> : "Advanced Search"}
          </button>
        </div>

        {/* Search Filters */}
        <div
          className={`${styles.searchContainer} ${
            showSearch ? styles.searchContainerOpen : ""
          } row mb-5`}
        >
          <h5 className="mb-5 text-center">Advanced Search</h5>
          <div className="col-md-4">
            <DatePickerComponent
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
            />
          </div>
          <div className="col-md-4">
            <DatePickerComponent
              label="End Date"
              value={endDate}
              onChange={setEndDate}
            />
          </div>
          <div className="col-md-4 d-flex align-items-end gap-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleSearchByDate}
              disabled={!startDate || !endDate}
            >
              Search
            </button>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Order No</th>
              <th style={{ textAlign: "center" }}>Invoice No</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Total</th>
              <th style={{ textAlign: "center" }}>Total User</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    {payment.order_number || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.invoice_number || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {format(new Date(payment.date), "dd-MM-yyyy")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    ₹{payment.total_amount || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.total_users || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {loadingRowId === payment.id ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <FileText
                        size={18}
                        className="text-success"
                        onClick={() =>
                          handledownload(payment.id, payment.employer_name)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentDetails;
