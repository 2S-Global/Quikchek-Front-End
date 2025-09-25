import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const EditfieldModal = ({ show, onClose, field }) => {
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    block: "",
    flat_number: "",
    name: "",
    allowed_verifications: "",
    transaction_fee: 0,
    transaction_gst: 18,
    phone_number: "",
    address: "",
    gst_no: "",
    package_id: "",
    email: "",
    discount_percent: "",
    id: "",
  });
  const [formErrors, setFormErrors] = useState({
    block: "",
    flat_number: "",
    name: "",
    email: "",
    password: "",
    transaction_fee: 0,
    transaction_gst: 18,
    allowed_verifications: "",
    phone_number: "",
    address: "",
    gst_no: "",
    package_id: "",
    discount_percent: "",
  });

  const [touched, setTouched] = useState({
    block: false,
    flat_number: false,
    name: false,
    email: false,
    password: false,
    transaction_fee: false,
    transaction_gst: false,
    allowed_verifications: false,
    phone_number: false,
    address: false,
    gst_no: false,
    package_id: false,
    discount_percent: false,
  });
  const [gstError, setGstError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  // Populate form when `field` changes
  useEffect(() => {
    if (field) {
      setFormData({
        block: field.block || "",
        flat_number: field.flat_no || "",
        name: field.name || "",
        id: field._id || "",
        phone_number: field.phone_number || "",
        email: field.email || "",
      });
    }
  }, [field]);

  const isValidGST = (gst) => {
    const regex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/;

    if (!regex.test(gst)) return false;

    let chars = gst.split("");
    let factor = [1, 2];
    let sum = 0;
    const modulus = 36;
    const codePointBase = "0".charCodeAt(0);
    const lettersBase = "A".charCodeAt(0);

    for (let i = 0; i < 14; i++) {
      let char = chars[i];
      let code = char.match(/[0-9]/)
        ? char.charCodeAt(0) - codePointBase
        : char.charCodeAt(0) - lettersBase + 10;

      let product = code * factor[i % 2];
      sum += Math.floor(product / modulus) + (product % modulus);
    }

    const checksumChar = (36 - (sum % 36)) % 36;
    const expected =
      checksumChar < 10
        ? String(checksumChar)
        : String.fromCharCode(lettersBase + checksumChar - 10);

    return chars[14] === expected;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    let errorMsg = "";

    switch (name) {
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errorMsg = "Please enter a valid email address.";
        }
        break;

      case "phone_number":
        updatedValue = value.replace(/\D/g, ""); // Remove non-digits
        if (updatedValue.length > 10) {
          updatedValue = updatedValue.slice(0, 10); // Limit to 10 digits
        }
        if (updatedValue && updatedValue.length !== 10) {
          errorMsg = "Phone number must be exactly 10 digits.";
        }
        break;

      default:
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const current = formData.allowed_verifications
      ? formData.allowed_verifications.split(",")
      : [];

    const updated = checked
      ? [...new Set([...current, value])]
      : current.filter((item) => item !== value);

    setFormData({
      ...formData,
      allowed_verifications: updated.join(","),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("Admin_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/ownerRoute/edit_owner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);
      setMessage_id(Date.now());
      window.location.reload();
      router.push("/owner");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  // const verificationOptions = ["PAN", "Aadhaar", "EPIC", "DL", "Passport"];
  // const selectedVerifications = formData.allowed_verifications.split(",");

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Edit Owner</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Response Message */}
              <MessageComponent
                error={error}
                success={success}
                errorId={errorId}
                message_id={message_id}
              />
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="block" className="form-label">
                    Block No
                  </label>
                  <input
                    type="text"
                    name="block"
                    className="form-control"
                    placeholder="Block No"
                    required
                    value={formData.block}
                    onChange={handleChange}
                  />
                  {formErrors.block && (
                    <div className="invalid-feedback">{formErrors.block}</div>
                  )}
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="flat_number" className="form-label">
                    Flat No.
                  </label>
                  <input
                    type="text"
                    name="flat_number"
                    className="form-control"
                    placeholder="Flat No"
                    required
                    value={formData.flat_number}
                    onChange={handleChange}
                  />
                  {formErrors.flat_number && (
                    <div className="invalid-feedback">
                      {formErrors.flat_number}
                    </div>
                  )}
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="name" className="form-label">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Owner Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${touched.email && formErrors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your Official Email address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, email: true }))
                    }
                  />
                  {touched.email && formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    name="phone_number"
                    className={`form-control ${formErrors.phone_number ? "is-invalid" : ""}`}
                    placeholder="Phone No."
                    value={formData.phone_number}
                    onChange={handleChange}
                    maxLength={10}
                    onBlur={() =>
                      setTouched((prev) => ({
                        ...prev,
                        phone_number: true,
                      }))
                    }
                  />
                  {touched.phone_number && formErrors.phone_number && (
                    <div className="invalid-feedback">
                      {formErrors.phone_number}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
