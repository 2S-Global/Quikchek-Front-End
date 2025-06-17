"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import MessageComponent from "@/components/common/ResponseMsg";
import AddCompanyModal from "./modals/addcompany";

import { Trash2, Pencil } from "lucide-react";

const Companytable = ({ addreload, setAddreload }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [editcompany, setEditcompany] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reload, setReload] = useState(false);

  /*  const  */
  const [message_id, setMessage_id] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const openModalRH = (companydetails) => {
    setEditcompany(companydetails);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("Super_token");
      if (!token) {
        setError("Token not found. Please log in again.");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/marquee/all_list_marquee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCompanies(response.data.data);
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error fetching companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, [apiurl]);

  useEffect(() => {
    if (reload) {
      fetchCompanies();
      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (addreload) {
      fetchCompanies();
      setAddreload(false);
    }
  }, [addreload]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(
        `${apiurl}/api/marquee/delete_marquee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { _id: id },
        }
      );

      if (response.data.success) {
        setCompanies((prev) => prev.filter((company) => company._id !== id));
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting company. Please try again.");
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
      const response = await axios.put(
        `${apiurl}/api/marquee/toggle_marquee_status`,
        {
          _id: id,
          is_active: !currentStatus,
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
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{ textAlign: "center" }}>S/N</th>
                    <th style={{ textAlign: "center" }}>Title</th>
                    <th style={{ textAlign: "center" }}>Sort</th>
                    <th style={{ textAlign: "center" }}>Image</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No records found
                      </td>
                    </tr>
                  ) : (
                    companies.map((company, index) => (
                      <tr key={company._id}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>{company.title}</td>
                        <td style={{ textAlign: "center" }}>{company.sort}</td>
                        <td style={{ textAlign: "center" }}>
                          {/* {company.image} */}

                          <img
                            alt="brand"
                            src={company.image}
                            style={{
                              maxWidth: "200px",
                              maxHeight: "80px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="form-check form-switch d-flex justify-content-center align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`switch-${company._id}`}
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
                              htmlFor={`switch-${company._id}`}
                            >
                              {company.is_active ? "Active" : "Inactive"}
                            </label>
                          </div>
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-3">
                            <div className="row">
                              <span title="Edit">
                                <Pencil
                                  className="text-primary"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => openModalRH(company)}
                                  size={20}
                                />
                              </span>

                              <span title="Delete">
                                <Trash2
                                  size={20}
                                  className="text-danger"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(company._id)}
                                />
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddCompanyModal
          show={isModalOpen}
          onClose={closeModalRH}
          item={editcompany}
          setReload={setReload}
        />
      )}
    </>
  );
};

export default Companytable;
