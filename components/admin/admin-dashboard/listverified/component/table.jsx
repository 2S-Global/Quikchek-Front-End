import { Eye } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const Table = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Super_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${apiurl}/api/usercart/getAllVerifiedCandidateAdmin`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response", response);
      } catch (err) {
        setError("Error fetching companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <MessageComponent error={error} success={success} />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="widget-content">
            <div className="row">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th style={{ textAlign: "center" }}>S/N</th>
                      <th style={{ textAlign: "center" }}>Candidate Name</th>
                      <th style={{ textAlign: "center" }}>Verified By</th>
                      <th style={{ textAlign: "center" }}>Date</th>
                      <th style={{ textAlign: "center" }}>
                        Verified Documents
                      </th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No records found
                        </td>
                      </tr>
                    ) : (
                      users.map((company, index) => (
                        <tr key={company._id}>
                          <td style={{ textAlign: "center" }}>{index + 1}</td>
                          <td style={{ textAlign: "center" }}>
                            {company.name}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {company.email}
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

                          <td className="text-center">
                            <div className="d-flex justify-content-center gap-3"></div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
