"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

const Additionfield = ({ formData, setFormData }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldlist, setFieldlist] = useState([]);

  // Set default additionalfields on mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      additionalfields: {
        ...prev.additionalfields,
        newfield: "new",
      },
    }));
  }, [setFormData]);

  // Fetch company fields
  useEffect(() => {
    const token = localStorage.getItem("Admin_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${apiurl}/api/fields/list_fields_by_company`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFieldlist(res.data.data || []);
        console.log("Fieldlist updated:", res.data.data);
      } catch (err) {
        setError("Error fetching companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [apiurl]);

  // Handle field value changes
  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalfields: {
        ...prev.additionalfields,
        [fieldName]: value,
      },
    }));
  };

  return (
    <>
      {loading && <p>Loading fields...</p>}

      <MessageComponent error={error} success={success} />

      {fieldlist.map((field) => (
        <div
          className="form-group col-lg-4 col-md-4 d-flex flex-column gap-3"
          key={field._id}
        >
          <label className="form-label">{field.name}</label>
          {field.field_type === "text" ? (
            <input
              type="text"
              className="form-control"
              placeholder={`Enter ${field.name}`}
              value={formData?.additionalfields?.[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ) : field.field_type === "select" ? (
            <select
              className="form-select"
              value={formData?.additionalfields?.[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              <option value="">Select {field.name}</option>
              {field.field_values
                .split(",")
                .map((val, idx) => val.trim())
                .filter(Boolean)
                .map((val, idx) => (
                  <option value={val} key={idx}>
                    {val}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type="text"
              className="form-control"
              placeholder={`Unsupported type (${field.field_type})`}
              disabled
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Additionfield;
