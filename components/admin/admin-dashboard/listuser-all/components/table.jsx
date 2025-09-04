"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";
import ReactPaginate from "react-paginate";

import EditfieldModal from "./modals/editfield";

import VerifiedlistModal from "./modals/verifiedlistModal";
import WalletModal from "./modals/walletModal";
const Companytable = ({ refresh, setRefresh }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Super_token");
  const router = useRouter();
  //const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [editcompany, setEditcompany] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalvlOpen, setIsModalvlOpen] = useState(false);
  const [isModelWalletOpen, setIsModelWalletOpen] = useState(false);
  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const openModalVL = (companydetails) => {
    setEditcompany(companydetails);
    setIsModalvlOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
    console.log("open modal verified list");
  };

  const openModalWallet = (companydetails) => {
    setEditcompany(companydetails);
    setIsModelWalletOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
    console.log("open modal wallet");
  };

  const closeModalVL = () => {
    setIsModalvlOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
    console.log("close modal verified list");
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const closeModalWallet = () => {
    setIsModelWalletOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  useEffect(() => {
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    fetchCompanies();
  }, [apiurl]);

  useEffect(() => {
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    if (refresh) {
      fetchCompanies();
      setRefresh(false);
    }
  }, [refresh]);
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiurl}/api/auth/list-all-users`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies(response.data.data);
      } else {
      }
    } catch (err) {
      setError("Error fetching companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("Super_token");

    console.log("Token:", token);
    console.log("ID:", id);
    console.log("Current Status:", currentStatus);

    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/togglestatus-companies`,
        {
          companyId: id,
          status: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies((prev) =>
          prev.map((comp) =>
            comp._id === id ? { ...comp, is_active: !currentStatus } : comp
          )
        );
        setSuccess(response.data.message);
      } else {
        setError("Failed to toggle status.");
      }
    } catch (error) {
      setError("Something went wrong while toggling status.");
    }
  };

  const toggleStatus2 = async (id, currentStatus) => {
    const token = localStorage.getItem("Super_token");

    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiurl}/api/auth/toggle_user_deletion_status`,
        { userId: id, currentStatus: currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies((prev) =>
          prev.map((comp) =>
            comp._id === id ? { ...comp, isVerified: !currentStatus } : comp
          )
        );

        const time = Date.now();
        setMessage_id(time);
        setSuccess(response.data.message);
      }
    } catch (err) {
      setError(err.invite?.data?.message || "FAILED TO UPDATE. Try again.");
      const time = Date.now();
      setErrorId(time);
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const offset = currentPage * itemsPerPage;
  const currentCompanies = companies.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(companies.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        message_id={message_id}
        errorId={errorId}
      />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="widget-content">
          <div className="row">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th style={{ textAlign: "center" }}>S/N</th>
                    <th style={{ textAlign: "center" }}>User Details</th>
                    <th style={{ textAlign: "center" }}>Role</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                    <th style={{ textAlign: "center" }}>Total Verification</th>
                    <th style={{ textAlign: "center" }}>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  ) : (
                    currentCompanies.map((company, index) => (
                      <tr key={company._id}>
                        <td style={{ textAlign: "center" }}>
                          {offset + index + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {company.name || "-"}
                          <br />
                          {company.email || "-"} <br />
                          {company.phone_number || "-"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {company.role_name || company.role || "-"}
                          <button
                            type="button"
                            className="btn btn-sm btn-success ms-2"
                            onClick={() => openModalWallet(company)}
                          >
                            Edit
                          </button>
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <div className="d-flex flex-column align-items-center">
                            {/* Active Status */}
                            <div className="d-flex flex-column align-items-center">
                              <span className="fw-bold text-secondary mb-1">
                                Activity
                              </span>
                              <div className="form-check form-switch d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`active-switch-${company._id}`}
                                  checked={company.is_active}
                                  onChange={() =>
                                    toggleStatus(company._id, company.is_active)
                                  }
                                />
                                <label
                                  className={`form-check-label ms-2 fw-semibold ${
                                    company.is_active
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                  htmlFor={`active-switch-${company._id}`}
                                >
                                  {company.is_active ? "Active" : "Inactive"}
                                </label>
                              </div>
                            </div>

                            {/* Verification Status */}
                            <div className="d-flex flex-column align-items-center">
                              <span className="fw-bold text-secondary mb-1">
                                Verification
                              </span>
                              <div className="form-check form-switch d-flex align-items-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`verify-switch-${company._id}`}
                                  checked={company.isVerified}
                                  onChange={() =>
                                    toggleStatus2(
                                      company._id,
                                      company.isVerified
                                    )
                                  }
                                />
                                <label
                                  className={`form-check-label ms-2 fw-semibold ${
                                    company.isVerified
                                      ? "text-success"
                                      : "text-danger"
                                  }`}
                                  htmlFor={`verify-switch-${company._id}`}
                                >
                                  {company.isVerified
                                    ? "Verified"
                                    : "Unverified"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            cursor:
                              company.orderCount > 0 ? "pointer" : "default",
                            transition: "background-color 0.3s ease",
                          }}
                          onClick={() =>
                            company.orderCount > 0 && openModalVL(company)
                          }
                          onMouseEnter={(e) => {
                            if (company.orderCount > 0) {
                              e.target.style.backgroundColor = "#c6f79a"; // Light gray on hover
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = ""; // Reset to default
                          }}
                        >
                          {company.orderCount > 0 ? company.orderCount : 0}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {new Date(company.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",

                            hour12: true,
                            timeZone: "Asia/Kolkata",
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center mt-3"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditfieldModal
          show={isModalOpen}
          onClose={closeModalRH}
          field={editcompany}
        />
      )}

      {isModalvlOpen && (
        <VerifiedlistModal
          show={isModalvlOpen}
          onClose={closeModalVL}
          company={editcompany}
        />
      )}
      {isModelWalletOpen && (
        <WalletModal
          show={isModelWalletOpen}
          onClose={closeModalWallet}
          data={editcompany}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default Companytable;
