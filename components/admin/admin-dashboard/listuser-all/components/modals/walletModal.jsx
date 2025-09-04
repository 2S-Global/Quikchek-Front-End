import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MessageComponent from "@/components/common/ResponseMsg";

const WalletModal = ({ onClose, data, show, setRefresh }) => {
  const [role, setRole] = useState(data.role);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("Super_token") : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [company, setCompany] = useState(data);

  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  const [rolelist, setRolelist] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/auth/all-user-roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setRolelist(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRole = async () => {
    if (!role) {
      setError("Please select a valid role.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Change role to "${rolelist.find((r) => r.role === Number(role))?.role_name}" for ${company?.name || "Company"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          setError(null);
          setSuccess(null);

          const res = await axios.post(
            `${apiurl}/api/auth/user-role-change`,
            {
              _id: company?._id,
              role: Number(role),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSuccess(res.data.message || "Role updated successfully.");
          setMessage_id(Date.now());
          setRefresh(true);

          Swal.fire("Updated!", "Role has been updated.", "success");
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Something went wrong while updating the role."
          );
          setErrorId(Date.now());
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header">
            <h5 className="modal-title">
              Update Role for <strong>{company?.name || "Company"}</strong>
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body px-4 py-3">
            <MessageComponent
              error={error}
              success={success}
              errorId={errorId}
              message_id={message_id}
            />

            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div
                  className="spinner-border text-primary spinner-lg"
                  role="status"
                  style={{ width: "4rem", height: "4rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <label className="form-label">Select Role</label>
                  <select
                    className="form-select"
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                  >
                    {rolelist.map((r) => (
                      <option key={r.role} value={r.role}>
                        {r.role_name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={handleUpdateRole}
                  >
                    Update Role
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
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

export default WalletModal;
