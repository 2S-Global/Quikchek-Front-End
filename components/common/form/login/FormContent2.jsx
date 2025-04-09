"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";

//new component
import MessageComponent from "../../ResponseMsg";
const FormContent2 = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${apiurl}/api/auth/login`, formData);

      //check if response is successful
      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }
      setSuccess("Log In successful!");
      const token = response.data.token;
      const role = response.data.role;

      //save token to local storage
      if (role == "1") {
        localStorage.setItem("Admin_token", token);
        router.push("/dashboard");
      } else if (role == "0") {
        localStorage.setItem("Super_token", token);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Quikchek</h3>
      <MessageComponent error={error} success={success} />
      {/* <!--Login Form--> */}
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
        {/* name */}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password-field"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging..." : "Log in"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent2;
