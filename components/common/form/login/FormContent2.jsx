"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MessageComponent from "../../ResponseMsg";
import { Eye, EyeOff } from "lucide-react"; // Or any icon library you prefer
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
const FormContent2 = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    const savedPassword = localStorage.getItem("remember_password");

    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }, []);

  const handlecompanyclick = () => {
    handleExternalLink("https://2sglobal.co/");
  };
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${apiurl}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }

      // Save credentials if Remember Me is checked
      if (formData.rememberMe) {
        localStorage.setItem("remember_email", formData.email);
        localStorage.setItem("remember_password", formData.password);
      } else {
        localStorage.removeItem("remember_email");
        localStorage.removeItem("remember_password");
      }

      setSuccess("Log In successful!");
      const token = response.data.token;
      const role = response.data.role;
      localStorage.setItem("Role", role);
      if (role == "1" || role == "2") {
        localStorage.setItem("Admin_token", token);
        localStorage.setItem("Admin_name", response.data.data.name);
        localStorage.setItem("Role", role);
        router.push("/dashboard");
      } else if (role == "0") {
        localStorage.setItem("Super_token", token);
        localStorage.setItem("Super_name", response.data.data.name);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="form-inner pb-4">
      {/* image logo */}
      <div className="mb-3 d-flex justify-content-center pb-4 pt-4">
        <Image
          alt="brand"
          src="/images/logo.png"
          width={214}
          height={70}
          priority
        />
      </div>

      <h3>Login to Quikchek</h3>
      <MessageComponent error={error} success={success} />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control pe-5"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
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
        </div>

        <div className="form-group">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="form-check mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                name="rememberMe"
                id="remember"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="">
              Forgot password?
            </a>
          </div>

          <div className="text-end">
            <a href="/signup" className="">
              Don't have an account? Sign up
            </a>
          </div>
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging..." : "Log in"}
          </button>
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
