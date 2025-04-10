"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MessageComponent from "@/components/common/ResponseMsg";

// Utility: Convert object to string format
const serializeAdditionalFields = (fields) => {
  return Object.entries(fields || {})
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");
};

const Additionfield = ({ formData, setFormData }) => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldlist, setFieldlist] = useState([]);

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
        setError("Error fetching fields. Please try again.");
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

      <div className="row">
        {fieldlist.map((field) => (
          <div
            className="form-group col-lg-4 col-md-6 d-flex flex-column gap-2 mb-3"
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
                  .map((val) => val.trim())
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
      </div>
    </>
  );
};

export default Additionfield;

// 👇 Use this function when submitting the form:
export const getPayloadWithSerializedFields = (formData) => ({
  ...formData,
  additionalfields: serializeAdditionalFields(formData.additionalfields),
});
