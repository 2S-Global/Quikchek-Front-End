import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import Select from "react-select";

const AddCompanyModal = ({ show, onClose, refresh, setRefresh }) => {
  const [formData, setFormData] = useState({
    all: false,
    list: [],
    fees: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  const router = useRouter();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Super_token");

  // Mock user list (replace with API fetch if needed)
  const [listuser, setListuser] = useState([]);
  useEffect(() => {
    fetchlist();
  }, [token]);

  const fetchlist = async () => {
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }
    try {
      const response = await axios.post(
        `${apiurl}/api/auth/list-demo-user-name-id`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setListuser(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Submit
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
        `${apiurl}/api/auth/change-all-demo-user-amount`,
        {
          all: formData.all,
          list: formData.all ? [] : formData.list.map((item) => item._id),
          fees: Number(formData.fees),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(response.data.message || "Updated successfully!");
      setMessage_id(response.data.message_id || null);
      setErrorId(null);

      setRefresh(true);

      // Close after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setErrorId(err.response?.data?.errorId || null);
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
              <h5 className="modal-title">Bulk Fees Edit</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body row">
              <form onSubmit={handleSubmit} className="default-form">
                {/* Response Message */}
                <MessageComponent
                  error={error}
                  success={success}
                  errorId={errorId}
                  message_id={message_id}
                />

                <div className="">
                  {/* ALL slider */}
                  <div className="mb-3 ">
                    <label className="form-label fw-semibold">
                      Apply to All
                    </label>
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.all}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            all: e.target.checked,
                            list: [], // clear list if all=true
                          }))
                        }
                      />
                      <label className="form-check-label">
                        {formData.all ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>

                  {/* MultiSelect (only if all=false) */}
                  {!formData.all && (
                    <div className="mb-3 ">
                      <label className="form-label fw-semibold">
                        Select Users
                      </label>
                      <Select
                        isMulti
                        options={listuser.map((u) => ({
                          value: u._id,
                          label: u.name,
                          ...u,
                        }))}
                        value={formData.list}
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            list: selected,
                          }))
                        }
                      />
                    </div>
                  )}

                  {/* Fees */}
                  <div className="mb-3 col-md-6">
                    <label className="form-label fw-semibold">Fees</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.fees}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      required
                    />
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
    </>
  );
};

export default AddCompanyModal;
