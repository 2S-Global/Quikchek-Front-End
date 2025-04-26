import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash2 } from "lucide-react"; // you had imported it, keeping it
import MessageComponent from "@/components/common/ResponseMsg";
import TermsModal from "../../footermodal/termsmodal";
import Razorpay from "razorpay";
import RazorpayPayment from "@/components/common/payments/RazorpayPayment";

const AadharOtp = () => {
  const company_name = localStorage.getItem("Admin_name");
  //razor pay
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;

  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    aadhar_number: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    aadhar_number: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  //rendering
  const [renderForm, setRenderForm] = useState(false);
  const [renderBill, setRenderBill] = useState(false);
  const [renderotp, setRenderotp] = useState(false);

  /* Billing part */
  const [paymentmethod, setPaymentmethod] = useState("online");
  const [subTotal, setSubTotal] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [sgstPercentage, setSgstPercentage] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [cgstPercentage, setCgstPercentage] = useState(0);

  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let errorMsg = "";

    if (name === "name") {
      const onlyLetters = /^[A-Za-z\s]*$/;
      if (!onlyLetters.test(value)) {
        return; // Prevent typing invalid characters
      }
      if (!value.trim()) {
        errorMsg = "Name is required.";
      }
    }

    if (name === "aadhar_number") {
      updatedValue = value.replace(/\D/g, ""); // Allow only digits
      if (updatedValue.length > 12) {
        updatedValue = updatedValue.slice(0, 12);
      }
      if (updatedValue.length !== 12) {
        errorMsg = "Aadhar number must be exactly 12 digits.";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleShowTermsModal = () => {
    setShowTermsModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
    document.body.style.overflow = "auto";
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.aadhar_number.length === 12 &&
      !formErrors.name &&
      !formErrors.aadhar_number
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(null);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Form submitted successfully!");
    }, 2000);
  };

  const handlePaymentSuccess = async (response, pay, pids) => {
    setLoading(true);
  };

  return (
    <>
      <MessageComponent error={error} success={success} />
      <div className="container">
        {renderForm && (
          <>
            <form className="default-form" onSubmit={handleSubmit}>
              <div className="row">
                {/* Aadhar Number */}
                <div className="form-group col-md-6 d-flex flex-column">
                  <label htmlFor="aadhar_number" className="form-label">
                    Aadhar Number <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="aadhar_number"
                    id="aadhar_number"
                    className={`form-control ${
                      touched.aadhar_number && formErrors.aadhar_number
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.aadhar_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={12}
                  />
                  {touched.aadhar_number && formErrors.aadhar_number && (
                    <div className="invalid-feedback">
                      {formErrors.aadhar_number}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="form-group col-md-6 d-flex flex-column">
                  <label htmlFor="name" className="form-label">
                    Full Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={`form-control ${
                      touched.name && formErrors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.name && formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>
              </div>

              {/* Checkbox */}
              <div className="form-group mt-3">
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheck"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheck">
                    This KYC verification is being done as per the request from
                    "{company_name}". The result is not for any promotional &
                    commercial purposes. I agree to all{" "}
                    <span
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={handleShowTermsModal}
                    >
                      Terms and Conditions
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  className="theme-btn btn-style-one"
                  type="submit"
                  disabled={!isFormValid() || !isChecked || loading}
                  style={{
                    backgroundColor:
                      !isFormValid() || !isChecked || loading ? "red" : "",
                    cursor:
                      !isFormValid() || !isChecked || loading
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {loading ? "Please wait..." : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}

        {renderBill ? (
          <>
            <div className="p-3 bg-light rounded mt-3">
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
                  />
                )}
              </div>
            </div>
          </>
        ) : null}
        {renderotp && (
          <form /* onSubmit={handleOTPSubmit} */>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Verify OTP
            </button>
          </form>
        )}
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <TermsModal show={showTermsModal} onClose={handleCloseTermsModal} />
      )}
    </>
  );
};

export default AadharOtp;
