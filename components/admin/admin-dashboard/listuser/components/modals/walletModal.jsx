import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MessageComponent from "@/components/common/ResponseMsg";
import { tr } from "date-fns/locale";

const WalletModal = ({ onClose, data, show, setRefresh }) => {
  const [amount, setAmount] = useState(data.demoUserAmount);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("Super_token") : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [company, setCompany] = useState(data);

  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  const handleAddWallet = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Edit ₹${amount} to ${company?.name || "Company"}'s fees?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          setError(null);
          setSuccess(null);

          const res = await axios.post(
            `${apiurl}/api/auth/change-demo-user-amount`,
            {
              _id: company?._id,
              demoUserAmount: Number(amount),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSuccess(res.data.message || "Fees updated successfully.");
          setMessage_id(Date.now());
          setAmount("");
          setRefresh(true);
          Swal.fire("Updated!", "Fees has been updated.", "success");
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Something went wrong while updating fees."
          );
          setErrorId(Date.now());
        } finally {
          setLoading(false);
          onClose();
        }
      }
    });
  };

  return (
    <>
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
                Update Fees for <strong>{company?.name || "Company"}</strong>
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
                    <label className="form-label">Updated Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                    <button
                      className="btn btn-success mt-3 w-100"
                      onClick={handleAddWallet}
                    >
                      Update
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
    </>
  );
};

export default WalletModal;
