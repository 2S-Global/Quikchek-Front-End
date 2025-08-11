import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MessageComponent from "@/components/common/ResponseMsg";
import ReactPaginate from "react-paginate";

const ReportDetails = () => {
  const [payments, setPayments] = useState([
    {
      _id: "689435f5fcdb70e0c6b478b2",
      name: "Abhishek Dey",
      ownerDetails: {
        name: "owner 1",
        FlatNo: "A-201",
      },
      date: "2025-05-13T09:31:31.612+00:00",
      amount: "",
      status: "",
    },
    {
      _id: "689435f5fcdb70e0c6b478b3",
      name: "John Doe",
      ownerDetails: {
        name: "owner 2",
        FlatNo: "B-101",
      },
      date: "2025-05-14T11:31:31.612+00:00",
      amount: "",
      status: "",
    },
    // Add more dummy data here to test pagination
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5; // Limit per page

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * rowsPerPage;
  const currentRows = payments.slice(offset, offset + rowsPerPage);

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
        <div className="container">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Owner Details</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((payment, index) => (
                  <tr key={payment._id}>
                    <td style={{ textAlign: "center" }}>
                      {offset + index + 1}
                    </td>
                    <td style={{ textAlign: "center" }}>{payment.name}</td>
                    <td style={{ textAlign: "center" }}>
                      {payment.ownerDetails
                        ? `${payment.ownerDetails.name || "N/A"} (${payment.ownerDetails.FlatNo || "N/A"})`
                        : ""}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {(() => {
                        const d = new Date(payment.date);
                        const day = String(d.getDate()).padStart(2, "0");
                        const month = String(d.getMonth() + 1).padStart(2, "0");
                        const year = d.getFullYear();
                        const hours = String(d.getHours()).padStart(2, "0");
                        const minutes = String(d.getMinutes()).padStart(2, "0");
                        return `${day}-${month}-${year} ${hours}:${minutes}`;
                      })()}
                    </td>
                    <td style={{ textAlign: "center" }}></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Component */}
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(payments.length / rowsPerPage)}
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
        </div>
      )}
    </>
  );
};

export default ReportDetails;
