"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import MessageComponent from "@/components/common/ResponseMsg";
import Link from "next/link";

const Index = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/forgotpass`,
        formData
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#EBE8E2",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Ensures footer sticks to bottom
        }}
      >
        {/* Content Section */}
        <div className="d-flex align-items-center justify-content-center py-3 flex-grow-1">
          <div
            className="login-form default-form p-4"
            style={{
              backgroundColor: "#FFFFFF",
              maxWidth: "500px",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="text-center mb-4">
              <Image
                alt="brand"
                src="/images/logo.png"
                width={214}
                height={70}
                priority
              />
            </div>
            <h3 className="text-center mb-3">Forgot Password</h3>
            <MessageComponent error={error} success={success} />
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3 text-end">
                <Link
                  href="/"
                  className="text-primary text-decoration-none fw-medium"
                >
                  Login
                </Link>
              </div>
              <div className="form-group text-center">
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sticky Footer */}
        <footer className="bg-light text-center text-muted py-3">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
              <Link href="/" className="text-muted text-decoration-none">
                Home
              </Link>
              <Link href="/about" className="text-muted text-decoration-none">
                About Us
              </Link>
              <Link href="/pricing" className="text-muted text-decoration-none">
                Pricing
              </Link>
              <Link href="/contact" className="text-muted text-decoration-none">
                Contact Us
              </Link>
              <Link href="/privacy" className="text-muted text-decoration-none">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted text-decoration-none">
                Terms & Conditions
              </Link>
              <Link href="/refund" className="text-muted text-decoration-none">
                Cancellation/Refund Policy
              </Link>
            </div>
            <div>
              &copy; {new Date().getFullYear()} QuikChek by 2S Global
              Technologies Limited
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
