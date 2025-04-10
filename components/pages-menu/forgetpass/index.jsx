"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MessageComponent from "@/components/common/ResponseMsg";

const Index = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      const response = await axios.post(
        `${apiurl}/api/auth/forgotpass`,
        formData
      );
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-section">
        <div
          className="image-layer"
          style={{ backgroundImage: "url(/images/background/12.jpg)" }}
        ></div>
        <div className="outer-box">
          <div className="login-form default-form">
            <div className="form-inner">
              <h3>Forgot Password</h3>
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
                  <button
                    className="theme-btn btn-style-one"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
