import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

import { Trash2 } from "lucide-react";

import Razorpay from "razorpay";
import RazorpayPayment from "@/components/common/payments/RazorpayPayment";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [paymentmethod, setPaymentmethod] = useState("online");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  /* Billing part */
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [sgstPercentage, setSgstPercentage] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [cgstPercentage, setCgstPercentage] = useState(0);

  const [walletBalance, setWalletBalance] = useState(0);
  const [fund_status, setFundStatus] = useState("");

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
          `${apiurl}/api/usercart/list_user_cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setPayments(response.data.data);
          setSubTotal(parseFloat(response.data.overall_billing.subtotal) || 0);
          setGst(parseFloat(response.data.overall_billing.gst) || 0);
          setTotal(parseFloat(response.data.overall_billing.total) || 0);
          setDiscount(parseFloat(response.data.overall_billing.discount) || 0);
          setDiscountPercentage(
            parseFloat(response.data.overall_billing.discount_percent) || 0
          );
          setSgst(parseFloat(response.data.overall_billing.sgst) || 0);
          setSgstPercentage(
            parseFloat(response.data.overall_billing.sgst_percent) || 0
          );
          setCgst(parseFloat(response.data.overall_billing.cgst) || 0);
          setCgstPercentage(
            parseFloat(response.data.overall_billing.cgst_percent) || 0
          );

          setWalletBalance(
            parseFloat(response.data.overall_billing.wallet_amount) || 0
          );
          setFundStatus(response.data.overall_billing.fund_status);
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

  const handleDelete = async (id) => {
    if (!token) return;
    setLoading(true);
    console.log("Deleting payment with ID:", id);
    try {
      const Dlt_response = await axios.post(
        `${apiurl}/api/usercart/deleteUser`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", Dlt_response.data);
      if (Dlt_response.data.success) {
        setPayments(Dlt_response.data.data);
        setSubTotal(
          parseFloat(Dlt_response.data.overall_billing.subtotal) || 0
        );
        setGst(parseFloat(Dlt_response.data.overall_billing.gst) || 0);
        setTotal(parseFloat(Dlt_response.data.overall_billing.total) || 0);
        setDiscount(
          parseFloat(Dlt_response.data.overall_billing.discount) || 0
        );
        setDiscountPercentage(
          parseFloat(Dlt_response.data.overall_billing.discount_percent) || 0
        );
        setSgst(parseFloat(Dlt_response.data.overall_billing.sgst) || 0);
        setSgstPercentage(
          parseFloat(Dlt_response.data.overall_billing.sgst_percent) || 0
        );
        setCgst(parseFloat(Dlt_response.data.overall_billing.cgst) || 0);
        setCgstPercentage(
          parseFloat(Dlt_response.data.overall_billing.cgst_percent) || 0
        );

        setWalletBalance(
          parseFloat(Dlt_response.data.overall_billing.wallet_amount) || 0
        );
        setFundStatus(Dlt_response.data.overall_billing.fund_status);
        setSuccess(Dlt_response.data.message);
      }
    } catch (err) {
      console.error("Error deleting payment:", err);
      setError("Error deleting payment. Please try again.");
    }
    setLoading(false);
  };

  const handlePaymentSuccess = async (response, pay, pids) => {
    setLoading(true);
    try {
      const paymentResponse = await axios.post(
        `${apiurl}/api/verify/paynow`,
        {
          razorpay_response: response,
          amount: pay,
          paymentIds: pids,
          payment_method: paymentmethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /* if code 200 */
      if (paymentResponse.status === 200) {
        setSuccess(
          "Your payment has been successfully processed. An invoice will be sent to your registered email shortly."
        );
        setPayments([]);
        setLoading(false);

        // Redirect to the download center after a 5-second delay
        setTimeout(() => {
          router.push("/download-center");
        }, 5000);
      }
    } catch (err) {
      setError("Error processing payment. Please try again.");
    }
  };

  const handlePaywallet = async (total, paymentIdsString) => {
    try {
      const paymentResponse = await axios.post(
        `${apiurl}/api/verify/paynow`,
        {
          amount: total,
          paymentIds: paymentIdsString,
          payment_method: paymentmethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      /* if code 200 */
      if (paymentResponse.status === 200) {
        setSuccess(paymentResponse.data.message);
        router.push("/download-center");
      }
    } catch (err) {
      setError("Error processing payment. Please try again.");
    }
  };

  if (loading) return;
  <p className="text-center">Loading...</p>;

  const paymentIdsString = payments.map((payment) => payment.id).join(", ");
  console.log("Payment IDs:", paymentIdsString);

  return (
    <>
      <MessageComponent error={error} success={success} />
      <div className="container">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Mobile Number</th>
              <th style={{ textAlign: "center" }}>Pay For</th>
              <th style={{ textAlign: "center" }}>Amount</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{payment.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {payment.mobile || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.payFor || "N/A"}
                  </td>
                  <td style={{ textAlign: "center" }}>{payment.amount} INR</td>
                  <td style={{ textAlign: "center" }}>
                    <Trash2
                      size={16}
                      className="text-danger"
                      onClick={() => handleDelete(payment.id)}
                    />
                  </td>
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
        {payments.length > 0 ? (
          <>
            <div className="p-3 bg-light rounded">
              <p className="d-flex justify-content-between mb-1">
                <span>Sub-Total :</span> <span>{subTotal?.toFixed(2)} INR</span>
              </p>
              <p className="d-flex justify-content-between mb-1">
                <span>Discount ({discountPercentage}%) :</span>{" "}
                <span>- {discount?.toFixed(2)} INR</span>
              </p>

              <p className="d-flex justify-content-between mb-1">
                <span>SGST ({sgstPercentage}%) :</span>{" "}
                <span>{sgst?.toFixed(2)} INR</span>
              </p>
              <p className="d-flex justify-content-between mb-1">
                <span>CGST ({cgstPercentage}%) :</span>{" "}
                <span>{cgst?.toFixed(2)} INR</span>
              </p>
              <p className="d-flex justify-content-between fw-bold fs-5">
                <span>Total :</span> <span>{total?.toFixed(2)} INR</span>
              </p>
            </div>

            <div className="mt-3">
              {/*  <div className="d-flex justify-content-end align-items-center gap-2">
                <label htmlFor="paymentmethod" className="mb-0">
                  Payment Method:
                </label>
                <select
                  className="form-select w-auto"
                  id="paymentmethod"
                  value={paymentmethod}
                  onChange={(e) => setPaymentmethod(e.target.value)}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="online">Online</option>
                  <option value="Wallet">
                    Wallet (Balance: ₹{walletBalance.toFixed(2)})
                  </option>
                </select>
              </div> */}

              <div className="d-flex justify-content-end gap-2 mt-3">
                {paymentmethod === "Wallet" && (
                  <>
                    {fund_status == 0 ? (
                      <button
                        className="btn btn-warning px-4"
                        disabled={payments.length === 0}
                      >
                        Add Balance to Wallet
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary px-4"
                        disabled={payments.length === 0}
                        onClick={() => handlePaywallet(total, paymentIdsString)}
                      >
                        Pay with Wallet ({total?.toFixed(2)} INR)
                      </button>
                    )}
                  </>
                )}

                {paymentmethod === "online" && (
                  <RazorpayPayment
                    amount={total}
                    razorpayKey={razorpayKey}
                    onSuccess={handlePaymentSuccess}
                    paymentIds={paymentIdsString}
                  />
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default PaymentDetails;
