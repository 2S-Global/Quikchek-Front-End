import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import { Eye, EyeOff } from "lucide-react"; // Or any icon library you prefer

const AddCompanyModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    flat_number: "",
    name: "",
    email: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [formErrors, setFormErrors] = useState({
    flat_number: "",
    name: "",
    email: "",
    phone_number: "",
  });

  const [touched, setTouched] = useState({
    flat_number: false,
    name: false,
    email: false,
    phone_number: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [gstError, setGstError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
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
    let current = formData.allowed_verifications
      ? formData.allowed_verifications.split(",")
      : [];

    if (checked) {
      current.push(value);
    } else {
      current = current.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      allowed_verifications: current.join(","),
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
      return;
    }
    try {
      const invite = await axios.post(
        `${apiurl}/api/invite/invite`,
        {
          email: formData.email,
          name: formData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("invite response", invite);
    } catch (err) {
      setError(err.invite?.data?.message || "Invite failed. Try again.");
      setErrorId(Date.now());
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/ownerRoute/register_owner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }

      setSuccess(response.data.message);
      setMessage_id(Date.now());
      window.location.reload();
      router.push("/owner");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Modal Overlay */}
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
              <h5 className="modal-title">Add New Owner</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body row">
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
                  {loading ? "Registering..." : "Register"}
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
    </>
  );
};

export default AddCompanyModal;
