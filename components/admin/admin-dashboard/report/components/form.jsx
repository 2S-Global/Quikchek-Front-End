import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { format } from "date-fns";
import MessageComponent from "@/components/common/ResponseMsg";

const Form = () => {
  const today = new Date();
  // 1st of current month
  const firstDayOfThisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  // 1st of next month
  const firstDayOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const [startDate, setStartDate] = useState(firstDayOfThisMonth);
  const [endDate, setEndDate] = useState(firstDayOfNextMonth);

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Super_token");

  const handleGenerateReport = async (type) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("type is", type);
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    if (type === "pdf") {
      try {
        const response = await axios.post(
          `https://quikchek-backend.onrender.com/api/pdf/report-pdf`,
          {
            start_date: formattedStartDate,
            end_date: formattedEndDate,
          },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Monthly Report.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setSuccess("PDF downloaded successfully!");
      } catch (err) {
        console.error("Error downloading PDF:", err);
        setError("Failed to download PDF. Please try again.");
      } finally {
        setLoading(false);
      }
    } else if (type === "csv") {
      try {
        const response = await axios.post(
          `${apiurl}/api/pdf/report-csv`,
          {
            start_date: formattedStartDate,
            end_date: formattedEndDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob", // Make sure this is inside the config object
          }
        );

        // Create a blob from the response
        const blob = new Blob([response.data], { type: "text/csv" });

        // Create a link element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.csv"); // Filename
        document.body.appendChild(link);
        link.click();

        // Cleanup
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Error downloading CSV:", err);
        setError("Failed to download CSV. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

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
        <div className="">
          <div className="">
            <div className="card-body">
              <div className="row g-4">
                <div className="col-md-4">
                  <label htmlFor="startDate" className="form-label">
                    Start Date:
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="endDate" className="form-label">
                    End Date:
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                  />
                </div>

                <div className="col-md-4">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleGenerateReport("pdf")}
                    >
                      <i className="bi bi-file-earmark-pdf me-1"></i> Generate
                      PDF
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => handleGenerateReport("csv")}
                    >
                      <i className="bi bi-file-earmark-excel me-1"></i> Generate
                      CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
