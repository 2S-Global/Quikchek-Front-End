import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

import { Trash2 } from "lucide-react";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
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
        const response = await axios.get(
          `${apiurl}/api/wallet/getUserTransactions`,
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
              <th style={{ textAlign: "center" }}>Transaction ID</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    {payment.transactionId || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {new Date(payment.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  <td style={{ textAlign: "center" }}>₹ {payment.amount}</td>
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
  );
};

export default PaymentDetails;
