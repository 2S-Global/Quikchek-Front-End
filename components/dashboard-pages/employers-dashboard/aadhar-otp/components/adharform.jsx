import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Trash2 } from "lucide-react"; // you had imported it, keeping it
import MessageComponent from "@/components/common/ResponseMsg";
import TermsModal from "../../footermodal/termsmodal";
import Razorpay from "razorpay";
import RazorpayPayment from "@/components/common/payments/RazorpayPayment";
import DatePicker from "react-datepicker";
import axios from "axios";

const AadharForm = ({
  loading,
  setLoading,
  error,
  setError,
  success,
  setSuccess,
  setRenderBill,
  setRenderForm,
  setFormsubmitted,
  formsubmitted,
  setPaymentvalues,
}) => {
  const company_name = localStorage.getItem("Admin_name");
  const [formData, setFormData] = useState({
    name: "",
    dob: null,
    phone: "",
    email: "",
    address: "",
    gender: "",
    aadhar_number: "",
    aadhar_name: "",
    aadhaardoc: null,
  });
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");
  const [validationErrors, setValidationErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const [documentData, setDocumentData] = useState({
    file: null,
    filePreview: null,
  });

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let errorMsg = "";

    if (["name", "aadhar_name"].includes(name)) {
      const onlyLetters = /^[A-Za-z\s]*$/;
      if (!onlyLetters.test(value)) return;
      if (!value.trim()) errorMsg = "Name is required.";
    } else if (name === "aadhar_number") {
      updatedValue = value.replace(/\D/g, "").slice(0, 12);
      if (updatedValue.length !== 12)
        errorMsg = "Aadhar number must be exactly 12 digits.";
    } else if (name === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
      if (updatedValue.length !== 10)
        errorMsg = "Phone number must be exactly 10 digits.";
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleDateChange = (date) => {
    if (date) setFormData({ ...formData, dob: date });
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (value && !emailRegex.test(value)) error = "Invalid email format";
    } else if (name === "phone" && value.length !== 10) {
      error = "Phone number must be exactly 10 digits";
    } else if (name === "aadhar_number" && value.length !== 12) {
      error = "Aadhar must be 12 digits";
    }

    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);

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
      !formErrors.aadhar_number &&
      !formErrors.aadhar_name
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      const formPayload = new FormData();
      for (let key in formData) formPayload.append(key, formData[key]);

      const response = await axios.post(
        `${apiurl}/api/usercart/add_user_cart_aadhao_otp`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message || "Submitted successfully");
      /*    setRenderBill(true); */
      setFormsubmitted(true);
      /* call setPaymentvalues function */
      setPaymentvalues();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentData({ file, filePreview: URL.createObjectURL(file) });
      setFormData((prev) => ({ ...prev, aadhaardoc: file }));
    }
  };

  return (
    <>
      <form
        className="default-form"
        onSubmit={handleSubmit}
        style={{
          pointerEvents: formsubmitted ? "none" : "auto",
          opacity: formsubmitted ? 0.5 : 1,
        }}
      >
        <div className="row">
          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth */}

          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>
              Date of Birth <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              selected={formData.dob ? new Date(formData.dob) : null}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              maxDate={eighteenYearsAgo}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              className={`form-control ${
                touched.phone && formErrors.phone ? "is-invalid" : ""
              }`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {validationErrors.phone && (
              <small className="text-danger">{validationErrors.phone}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleValidation}
              required
            />
            {validationErrors.email && (
              <small className="text-danger">{validationErrors.email}</small>
            )}
          </div>

          {/* Gender */}
          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          {/* Aadhar Number */}
          <div className="form-group col-md-4 d-flex flex-column">
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
              <div className="invalid-feedback">{formErrors.aadhar_number}</div>
            )}
          </div>

          {/* Name */}
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="aadhar_name" className="form-label">
              Full Name As per Aadhar <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="aadhar_name"
              id="aadhar_name"
              className={`form-control ${
                touched.aadhar_name && formErrors.aadhar_name
                  ? "is-invalid"
                  : ""
              }`}
              value={formData.aadhar_name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.aadhar_name && formErrors.aadhar_name && (
              <div className="invalid-feedback">{formErrors.aadhar_name}</div>
            )}
          </div>

          {/* File Upload */}

          <div className="aadhar-otp-page form-group col-lg-4 col-md-4 d-flex flex-column">
            <label htmlFor="aadhaardoc">Upload Aadhar File</label>
            <div className="uploadButton d-flex align-items-center">
              <input
                key={inputKey}
                className="uploadButton-input"
                type="file"
                name="file"
                accept="image/*"
                id="aadhaardoc"
                onChange={handleFileSelect}
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="aadhaardoc"
                style={{
                  width: "100%",
                  height: "40px",
                  cursor: "pointer",
                }}
              >
                <span style={{ paddingTop: "6px", display: "inline-block" }}>
                  {documentData.file ? (
                    <span
                      onClick={() =>
                        window.open(documentData.filePreview, "_blank")
                      }
                    >
                      {documentData.file.name}
                    </span>
                  ) : (
                    `Browse Aadhar File`
                  )}
                </span>
              </label>
              {documentData.file ? (
                <Trash2
                  className="text-danger "
                  size={20}
                  onClick={() => {
                    setDocumentData({
                      ...documentData,
                      file: null,
                      filePreview: null,
                    });
                    setInputKey(Date.now());
                    setFormData((prevData) => ({
                      ...prevData,
                      aadhaardoc: null,
                    }));
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Checkbox */}
        {!formsubmitted && (
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
                This KYC verification is being done as per the request from "
                {company_name}". The result is not for any promotional &
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
        )}
      </form>
      {showTermsModal && (
        <TermsModal show={showTermsModal} onClose={handleCloseTermsModal} />
      )}
    </>
  );
};

export default AadharForm;
