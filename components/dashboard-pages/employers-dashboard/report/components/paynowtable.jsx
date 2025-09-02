import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MessageComponent from "@/components/common/ResponseMsg";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Eye } from "lucide-react";
import Link from "next/link";

const ReportDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);

  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");

  // Date filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    fetchreports();
  }, []);

  useEffect(() => {
    console.log(startDate, endDate);
  }, [startDate, endDate]);

  const fetchreports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiurl}/api/complex/getreports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setPayments(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter payments by date range
  const filteredPayments = payments.filter((payment) => {
    const paymentDate = new Date(payment.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && paymentDate < start) return false;
    if (end && paymentDate > end) return false;
    return true;
  });

  // Pagination after filtering
  const offset = currentPage * rowsPerPage;
  const currentRows = filteredPayments.slice(offset, offset + rowsPerPage);

  const handeldownload = async (startDate, endDate) => {
    setDownloading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/complex/reportPDF`,
        { startDate, endDate },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess("PDF downloaded successfully!");
      setMessage_id(Date.now());
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to download PDF. Please try again.");
      setErrorId(Date.now());
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <MessageComponent
        error={error}
        success={success}
        errorId={errorId}
        message_id={message_id}
      />

      {/* Filters */}
      <div className="container my-3">
        <div className="row align-items-end g-3">
          <div className="col-md-4">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col-md-4 d-flex">
            <button
              disabled={downloading || currentRows.length === 0}
              style={{ cursor: downloading ? "not-allowed" : "pointer" }}
              type="button"
              className="btn btn-primary w-100"
              onClick={() => handeldownload(startDate, endDate)}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="table-responsive ">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Owner Details</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Document</th>
                  <th style={{ textAlign: "center" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  <>
                    {currentRows.map((payment, index) => (
                      <tr key={payment._id}>
                        <td style={{ textAlign: "center" }}>
                          {offset + index + 1}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {payment.candidate_name}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {payment.owner_id
                            ? `${payment.owner_id.name || "N/A"} (${payment.owner_id.flat_no || "N/A"})`
                            : "N/A"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {(() => {
                            const d = new Date(payment.createdAt);
                            const day = String(d.getDate()).padStart(2, "0");
                            const month = String(d.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const year = d.getFullYear();
                            const hours = String(d.getHours()).padStart(2, "0");
                            const minutes = String(d.getMinutes()).padStart(
                              2,
                              "0"
                            );
                            return `${day}-${month}-${year} ${hours}:${minutes}`;
                          })()}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {payment.document}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          ₹ {payment.order_ref_id?.total_amount || "0"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {payment.aadhat_otp === "yes" ? (
                            <Link
                              href={`/list-verified-employee/detailsaadhar?id=${payment._id}`}
                              passHref
                            >
                              <button
                                className="btn btn-sm"
                                title="View Details"
                              >
                                <Eye size={16} className="me-1 text-primary" />
                              </button>
                            </Link>
                          ) : (
                            <Link
                              href={`/list-verified-employee/details?id=${payment._id}`}
                              passHref
                            >
                              <button
                                className="btn btn-sm"
                                title="View Details"
                              >
                                <Eye size={16} className="me-1 text-primary" />
                              </button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}

                    {/* Total Row */}
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        Total
                      </td>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        ₹{" "}
                        {filteredPayments
                          .reduce(
                            (total, payment) =>
                              total +
                              (parseFloat(payment.order_ref_id?.total_amount) ||
                                0),
                            0
                          )
                          .toFixed(2)}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {currentRows.length > 0 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredPayments.length / rowsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReportDetails;
