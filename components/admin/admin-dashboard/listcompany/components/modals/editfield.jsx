import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const EditfieldModal = ({ show, onClose, field }) => {
  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    allowed_verifications: "",
    transaction_fee: "",
    transaction_gst: "",
    id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Populate form when `field` changes
  useEffect(() => {
    if (field) {
      setFormData({
        name: field.name || "",
        allowed_verifications: field.allowed_verifications || "",
        transaction_fee: field.transaction_fee || "",
        transaction_gst: field.transaction_gst || "",
        id: field._id || "",
      });
    }
  }, [field]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/edit_user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);

      if (response.status === 200) {
        onClose(); // close modal
        router.refresh?.(); // refresh page if using App Router
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const verificationOptions = ["PAN", "Aadhaar", "EPIC", "DL", "Passport"];
  const selectedVerifications = formData.allowed_verifications.split(",");

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
            <h5 className="modal-title">Edit Company</h5>
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
              <MessageComponent error={error} success={success} />

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3 text-center">
                <strong className="d-block mb-2">Allowed Verifications</strong>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  {verificationOptions.map((item, index) => (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`check-${index}`}
                        value={item}
                        checked={selectedVerifications.includes(item)}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`check-${index}`}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Company"}
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
