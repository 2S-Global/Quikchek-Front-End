"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import MessageComponent from "../../ResponseMsg";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const FormContent2 = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_type: "individual",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    gst_no: "",
    password: "",
    required_services: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const handlecompanyclick = () => {
    handleExternalLink("https://2sglobal.co/");
  };
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "name":
        if (!value.trim()) message = "Name is required.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        )
          message = "Invalid email format.";
        break;
      case "phone_number":
        if (!value.trim()) message = "Phone number is required.";
        else if (!/^\d{10}$/.test(value))
          message = "Phone number must be exactly 10 digits.";
        break;
      case "address":
        if (!value.trim()) message = "Address is required.";
        break;
      case "password":
        if (!value.trim()) message = "Password is required.";
        break;

      case "gst_no":
        if (
          value.trim() &&
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            value
          )
        ) {
          message = "Invalid GST number format.";
        }
        break;

      case "required_services":
        if (value.length === 0) message = "Please select at least one service.";
        break;
      default:
        break;
    }
    return message;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const message = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (name === "phone_number") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      const message = validateField(name, newValue);
      setErrors((prev) => ({ ...prev, [name]: message }));
    }
  };

  const handleVerificationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newTypes = checked
        ? [...prev.required_services, value]
        : prev.required_services.filter((type) => type !== value);
      return { ...prev, required_services: newTypes };
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const message = validateField(key, value);
      if (message) newErrors[key] = message;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        Object.fromEntries(Object.keys(newErrors).map((k) => [k, true]))
      );
      return;
    }

    // Convert the required_services array to a comma-separated string
    const formDataToSubmit = {
      ...formData,
      required_services: formData.required_services.join(","),
    };

    setLoading(true);
    try {
      const invite = await axios.post(`${apiurl}/api/invite/invite`, {
        email: formData.email,
        name: formData.name,
      });
      console.log("invite response", invite);
    } catch (err) {
      setError(err.invite?.data?.message || "Invite failed. Try again.");
    }

    let fullurl = ``;
    if (formData.user_type === "demo") {
      fullurl = `${apiurl}/api/auth/register-demo-user`;
    } else {
      fullurl = `${apiurl}/api/auth/register-frontend-user`;
    }

    try {
      const response = await axios.post(fullurl, formDataToSubmit);
      setSuccess("Registration successful!");
      setError(null);
      setFormData({}); // Clear the form
      setTouched({});
      setErrors({});

      setTimeout(() => {
        router.push("/"); // Redirect after 1.5s
      }, 1500);
    } catch (err) {
      setError("An error occurred during registration.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-inner pb-4">
      <div className="mb-3 d-flex justify-content-center pb-4 pt-4">
        <Image
          alt="brand"
          src="/images/logo.png"
          width={214}
          height={70}
          priority
        />
      </div>

      <h3>Register to Quikchek</h3>
      <MessageComponent error={error} success={success} />

      <form onSubmit={handleSubmit}>
        {/* Account Type */}
        <div className="form-group">
          <label>
            Account Type <span className="text-danger">*</span>
          </label>
          <div className="d-flex gap-3">
            <div>
              <input
                type="radio"
                id="individual"
                name="user_type"
                value="individual"
                checked={formData.user_type === "individual"}
                onChange={handleChange}
              />
              <label htmlFor="individual" className="ms-2">
                Individual
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="company"
                name="user_type"
                value="company"
                checked={formData.user_type === "company"}
                onChange={handleChange}
              />
              <label htmlFor="company" className="ms-2">
                Company
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="demo"
                name="user_type"
                value="demo"
                checked={formData.user_type === "demo"}
                onChange={handleChange}
              />
              <label htmlFor="demo" className="ms-2">
                Demo
              </label>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="form-group">
          <label>
            {formData.user_type === "individual" ||
            formData.user_type === "demo"
              ? "Full Name "
              : "Company Name "}{" "}
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            placeholder={
              formData.user_type === "individual" ||
              formData.user_type === "demo"
                ? "Enter your full name"
                : "Enter company name"
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>

        {/* Email */}

        <div className="form-group">
          <label>
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            placeholder="Enter your email address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number || ""}
            placeholder="Enter your phone number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone_number && (
            <small className="text-danger">{errors.phone_number}</small>
          )}
        </div>

        {/* Address */}
        <div className="form-group">
          <label>
            Address <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            placeholder="Enter your address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address && (
            <small className="text-danger">{errors.address}</small>
          )}
        </div>

        {/* GST Number */}
        {formData.user_type === "company" && (
          <div className="form-group">
            <label>GST Number </label>
            <input
              type="text"
              name="gst_no"
              value={formData.gst_no || ""}
              placeholder="Enter GST number"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.gst_no && (
              <small className="text-danger">{errors.gst_no}</small>
            )}
          </div>
        )}

        {/* Password */}
        <div className="form-group">
          <label>
            Password <span className="text-danger">*</span>
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password || ""}
              className="form-control pe-5"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        {/* Verification Checkboxes */}
        <div className="form-group">
          <label>
            Select Verification Type(s) <span className="text-danger">*</span>
          </label>
          <div className="d-flex flex-wrap gap-3">
            {["PAN", "EPIC", "PASSPORT", "DL", "UAN", "AADHAR_WITH_OTP"].map(
              (type) => (
                <div key={type} className="form-check">
                  <input
                    type="checkbox"
                    name="required_services"
                    value={type}
                    checked={
                      Array.isArray(formData.required_services) &&
                      formData.required_services.includes(type)
                    } // Ensure it's an array
                    onChange={handleVerificationChange}
                    className="form-check-input"
                    id={type}
                  />
                  <label htmlFor={type} className="form-check-label ms-1">
                    {type.replaceAll("_", " ")}
                  </label>
                </div>
              )
            )}
          </div>
          {touched.required_services && errors.required_services && (
            <small className="text-danger">{errors.required_services}</small>
          )}
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        {/* Login Link below */}
        <div className="form-group text-center mt-3">
          <a href="/" className="pwd">
            Returning User? Click Here to Login...
          </a>
        </div>
      </form>

      <div className="mt-5 text-center">
        <p className="text-muted small">
          Developed and maintained by{" "}
          <strong
            className="text-dark"
            onClick={handlecompanyclick}
            style={{ cursor: "pointer" }}
          >
            2S Global Technologies Ltd
          </strong>
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          onClick={() =>
            handleExternalLink(
              "https://www.facebook.com/profile.php?id=61575548305003"
            )
          }
          className="btn btn-outline-primary rounded-circle"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={() =>
            handleExternalLink(
              "https://www.linkedin.com/company/global-employability-information-services-india-limited/"
            )
          }
          className="btn btn-outline-primary rounded-circle"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </button>
      </div>
    </div>
  );
};

export default FormContent2;
