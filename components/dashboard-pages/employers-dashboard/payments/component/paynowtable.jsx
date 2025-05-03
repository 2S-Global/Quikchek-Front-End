import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

import { Trash2, FileText } from "lucide-react";

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

  //razor pay
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("Admin_token");

    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchPayments = async () => {
      try {
        const response = await axios.post(
          `${apiurl}/api/usercart/list_all_transaction_company`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);

        if (response.data.success) {
          setPayments(response.data.data);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (err) {
        console.error("Error fetching data:", err); // Debugging
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

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

  if (loading) return <p className="text-center">Loading...</p>;

  const paymentIdsString = payments.map((payment) => payment.id).join(", ");
  console.log("Payment IDs:", paymentIdsString);

  return (
    <>
      <MessageComponent error={error} success={success} />
      <div className="container mt-4">
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
                    {new Date(payment.date).toLocaleDateString("en-GB")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    ₹{payment.total_amount || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.total_users || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }} key={payment.id}>
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
