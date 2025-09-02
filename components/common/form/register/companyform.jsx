import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
//new component
import MessageComponent from "../../ResponseMsg";

const FormContentcom = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const router = useRouter();
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
      const response = await axios.post(
        `${apiurl}/api/auth/company-register`,
        formData
      );
      console.log("Response:", response);
      //check if response is successful
      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }
      setSuccess("Registration successful!");
      setMessage_id(Date.now());
      const token = response.data.token;
      localStorage.setItem("Admin_token", token);
      router.push("/employers-dashboard/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
      setErrorId(Date.now());
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* display error */}
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name as per PAN"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      {/* name */}
      <div className="form-group">
        <label>Official Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="
        Enter your Official Email address"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
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
      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContentcom;
