import React, { useEffect, useState } from "react";
import Razorpay from "razorpay";
import RazorpayPayment from "@/components/common/payments/RazorpayPayment";
import MessageComponent from "@/components/common/ResponseMsg";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function WalletBalance() {
  const [balance, setBalance] = useState(1250.75);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [paymentIdsString, setPaymentIdsString] = useState("");

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const router = useRouter();
  const token = localStorage.getItem("Admin_token");
  console.log("token:", token);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.post(
          `${apiurl}/api/wallet/walletBalance`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.data.wallet_amount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        setLoading(false);
      }
    };
    fetchWalletBalance();
  }, []);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    if (!isNaN(amount) && amount > 0) {
      setBalance((prevBalance) => prevBalance - amount);
      setPaymentAmount("");
      setShowPaymentForm(false);
    }
  };

  return (
    <div className="mt-4">
      {/* Wallet Heading */}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted mb-1 small">Current Balance</p>
            <h2 className="mb-0">₹{balance.toFixed(2)}</h2>
          </div>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="btn btn-outline-dark btn-sm"
          >
            {showPaymentForm ? "Cancel" : "Add Balance"}
            {!showPaymentForm && <i className="bi bi-arrow-right ms-2"></i>}
          </button>
        </div>
      </section>

      {/* Payment Form */}
      {showPaymentForm && (
        <section>
          <h5 className="mb-3">Make a Payment</h5>
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-3">
              <label htmlFor="paymentAmount" className="form-label">
                Payment Amount
              </label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  id="paymentAmount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <RazorpayPayment
              amount={paymentAmount}
              razorpayKey={razorpayKey}
              onSuccess={handlePaymentSubmit}
              paymentIds={paymentIdsString}
            />
          </form>
        </section>
      )}
    </div>
  );
}
