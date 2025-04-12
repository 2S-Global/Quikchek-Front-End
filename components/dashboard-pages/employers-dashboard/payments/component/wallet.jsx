import { useState } from "react";

export default function WalletBalance() {
  const [balance, setBalance] = useState(1250.75);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
            <h2 className="mb-0">${balance.toFixed(2)}</h2>
          </div>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="btn btn-outline-dark btn-sm"
          >
            {showPaymentForm ? "Cancel" : "Make Payment"}
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
                <span className="input-group-text">$</span>
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

            <div className="mb-3 d-flex align-items-center">
              <i className="bi bi-credit-card me-2 text-secondary"></i>
              <small className="text-secondary">
                Payment will be made using your default payment method
              </small>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Confirm Payment
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
