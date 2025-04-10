import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const AddCompanyModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/register`,
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
      window.location.reload();
      router.push("/admin/listcompany");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
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
              <h5 className="modal-title">Add New Company</h5>
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
                <MessageComponent error={error} success={success} />
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name as per PAN"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your Official Email address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone_number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4 col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="gst_no" className="form-label">
                      GST Number
                    </label>
                    <input
                      type="text"
                      name="gst_no"
                      className="form-control"
                      placeholder="GST Number"
                      required
                      value={formData.gst_no}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="package_id" className="form-label">
                      Package
                    </label>
                    <select
                      name="package_id"
                      className="form-select"
                      required
                      value={formData.package_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Package</option>
                      <option value="1">All</option>
                      <option value="2">Indivitual</option>
                    </select>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="discount_percent" className="form-label">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      name="discount_percent"
                      className="form-control"
                      placeholder="Discount Percentage"
                      required
                      value={formData.discount_percent}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.package_id === "" ? null : formData.package_id ==
                    2 ? (
                    <div className="mb-3 text-center col-md-12">
                      <strong className="d-block mb-2">
                        Allowed Verification
                      </strong>
                      <div className="d-flex justify-content-center flex-wrap gap-3">
                        {["PAN", "Aadhaar", "EPIC", "DL", "Passport"].map(
                          (item, index) => (
                            <div className="form-check" key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`check-${index}`}
                                value={item}
                                onChange={handleCheckboxChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`check-${index}`}
                              >
                                {item}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 text-center col-md-12">
                      <span className="fw-semibold fs-5 text-success">
                        All verifications are selected by default
                      </span>
                    </div>
                  )}

                  <div className="mb-3 col-md-6">
                    <label htmlFor="transaction_fee" className="form-label">
                      Transaction Fee
                    </label>
                    <input
                      type="number"
                      name="transaction_fee"
                      className="form-control"
                      placeholder="Transaction Fee"
                      required
                      value={formData.transaction_fee}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="transaction_gst" className="form-label">
                      Transaction GST (%)
                    </label>
                    <input
                      type="number"
                      name="transaction_gst"
                      className="form-control"
                      placeholder="Transaction GST"
                      required
                      value={formData.transaction_gst}
                      onChange={handleChange}
                    />
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
