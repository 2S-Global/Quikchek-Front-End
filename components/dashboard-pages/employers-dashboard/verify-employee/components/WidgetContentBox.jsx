import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DocumentUpload from "./document";
import { useRouter } from "next/navigation";
import { format } from "date-fns"; // Import from date-fns
import { Trash2 } from "lucide-react";
import MessageComponent from "@/components/common/ResponseMsg";
import { validateDocuments } from "@/components/dashboard-pages/employers-dashboard/verify-employee/components/validateDocuments"; // adjust path as needed
import Additionfield from "./additionfield";
const WidgetContentBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: null,
    phone: "",
    email: "",
    address: "",
    gender: "",
    panname: "",
    aadhaarname: "",
    votername: "",
    licensename: "",
    passportname: "",
    pannumber: "",
    aadhaarnumber: "",
    voternumber: "",
    licensenumber: "",
    passportnumber: "",
    pandoc: null,
    aadhaardoc: null,
    voterdoc: null,
    licensenumdoc: null,
    passportdoc: null,
    additionalfields: {},
    // uanname:null,
    uannumber: null,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [valiError, setvaliError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const [errorId, setErrorId] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "name" ||
      name === "passportname" ||
      name === "panname" ||
      name === "aadhaarname" ||
      name === "votername" ||
      name === "licensename"
    ) {
      const onlyLetters = /^[A-Za-z\s]*$/; // Allow letters and spaces only

      if (!onlyLetters.test(value)) {
        return; // Don't update state if invalid character
      }
    }

    if (name === "phone") {
      const onlyNumbers = /^[0-9]*$/; // Only numbers allowed

      // If value contains any non-numeric characters, prevent update
      if (!onlyNumbers.test(value)) {
        return; // Don't update state if invalid character
      }

      // Check for exact 10 characters
      if (value.length > 10) {
        return; // Prevent more than 10 characters
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (name === "pannumber") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      setValidationErrors((prev) => ({
        ...prev,
        pannumber:
          value === "" ? "" : panRegex.test(value) ? "" : "Invalid PAN format",
      }));
    }

    if (name === "aadhaarnumber") {
      const aadhaarRegex = /^\d{12}$/;
      setValidationErrors((prev) => ({
        ...prev,
        aadhaarnumber:
          value === ""
            ? ""
            : aadhaarRegex.test(value)
              ? ""
              : "Aadhaar must be 12 digits",
      }));
    }

    if (name === "licensenumber") {
      const licenseRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{4}\s?[0-9]{7}$/i;
      setValidationErrors((prev) => ({
        ...prev,
        licensenumber:
          value === ""
            ? ""
            : licenseRegex.test(value)
              ? ""
              : "Invalid License format",
      }));
    }

    if (name === "voternumber") {
      const voterRegex = /^[A-Z]{3}[0-9]{7}$/i;

      setValidationErrors((prev) => ({
        ...prev,
        voternumber:
          value === "" ? "" : voterRegex.test(value) ? "" : "Invalid Voter ID",
      }));
    }

    if (name === "phone") {
      if (value === "") {
        setValidationErrors((prev) => ({
          ...prev,
          phone: "", // No error if field is left empty
        }));
      } else if (value.length !== 10) {
        setValidationErrors((prev) => ({
          ...prev,
          phone: "Phone number must be exactly 10 digits",
        }));
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          phone: "", // Valid input
        }));
      }
    }

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      setValidationErrors((prev) => ({
        ...prev,
        email:
          value === ""
            ? "" // or you can show "Email is required" if it's mandatory
            : emailRegex.test(value)
              ? ""
              : "Invalid email format",
      }));
    }

    if (name === "uannumber") {
      const uanRegex = /^[0-9]{12}$/i;

      setValidationErrors((prev) => ({
        ...prev,
        uannumber:
          value === ""
            ? ""
            : uanRegex.test(value)
              ? ""
              : "UAN must be a 12-digit number",
      }));
    }
  };
  const handleDateChange = (date) => {
    if (date) {
      setFormData({ ...formData, dob: date }); // Store raw Date object
    }
  };

  const handleFileChange = (docType, file) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${docType}doc`]: file || null, // Ensure null when file is removed
    }));
  };

  const isFormValid =
    !validationErrors.pannumber &&
    !validationErrors.aadhaarnumber &&
    !validationErrors.licensenumber &&
    !validationErrors.voternumber &&
    !validationErrors.phone &&
    !validationErrors.email;
  !validationErrors.uannumber;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
    setvaliError(null);

    const errorMsg = validateDocuments(formData);
    if (errorMsg) {
      setError(errorMsg);
      setErrorId(Date.now());
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key] instanceof Date) {
        formDataToSend.append(key, format(formData[key], "yyyy-MM-dd")); // Convert Date to string
      } else if (key === "additionalfields" && formData[key]) {
        const additionalString = Object.entries(formData[key])
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
        formDataToSend.append(key, additionalString);
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      console.log(formDataToSend.additionalfields);
      const response = await axios.post(
        `${apiurl}/api/usercart/add_user_cart`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(response.data.message);
        router.push("/paynow");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fileId = "upload-passport";

  const [documentData, setDocumentData] = useState({
    docName: "",
    docNumber: "",
    file: null,
    filePreview: null,
  });
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setDocumentData({
        ...documentData,
        file,
        filePreview: fileURL,
      });

      if (handleFileChange) {
        handleFileChange(name, file);
      }
    }
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="widget-content">
      <div className="col-lg-12 col-md-12 py-2">
        <h5>
          <strong>Add Employee Details</strong>
        </h5>
      </div>

      <div className="row">
        <form className="default-form" onSubmit={handleSubmit}>
          <MessageComponent error={error} success={success} errorId={errorId} />
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h5
                className="text-center mb-2"
                style={{ textDecoration: "underline" }}
              >
                Personal Details
              </h5>
            </div>

            {/* Full Name */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}

            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Date of Birth <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                selected={formData.dob ? new Date(formData.dob) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                maxDate={eighteenYearsAgo}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleValidation}
              />
              {validationErrors.phone && (
                <small className="text-danger">{validationErrors.phone}</small>
              )}
            </div>

            {/* Email */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleValidation}
                required
              />
              {validationErrors.email && (
                <small className="text-danger">{validationErrors.email}</small>
              )}
            </div>

            {/* Gender */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={1}
              />
            </div>

            {/* from anaother */}
            <Additionfield formData={formData} setFormData={setFormData} />
          </div>

          {/* Document Uploads */}
          <DocumentUpload
            label="PAN"
            name="pan"
            fileId="upload-pan"
            valuename={formData.panname}
            numbername={formData.pannumber}
            numberError={validationErrors.pannumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
            onfieldValidation={handleValidation}
          />

          <div className="row">
            {/* Heading */}
            {/* Document Number Input passportnumber */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Passport File Number</label>
              <input
                type="text"
                name="passportnumber"
                placeholder="Enter Name as per Passport"
                className="form-control"
                value={formData.passportnumber}
                onChange={handleChange}
              />
            </div>
            {/* Name Input */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>Name as per Passport</label>
              <input
                type="text"
                name="passportname"
                placeholder="Enter Name on Passport"
                className="form-control"
                value={formData.passportname}
                onChange={handleChange}
              />
            </div>

            {/* File Upload */}
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label htmlFor={fileId}>Upload Passport File</label>
              <div className="uploadButton d-flex align-items-center">
                <input
                  className="uploadButton-input"
                  type="file"
                  name="file"
                  accept="image/*,application/pdf"
                  id={fileId}
                  onChange={handleFileSelect}
                />
                <label
                  className="uploadButton-button ripple-effect"
                  htmlFor={fileId}
                  style={{ width: "100%", height: "40px", cursor: "pointer" }}
                >
                  {documentData.file ? (
                    <span
                      onClick={() =>
                        window.open(documentData.filePreview, "_blank")
                      }
                    >
                      {documentData.file.name}
                    </span>
                  ) : (
                    `Browse Passport File`
                  )}
                </label>
                {documentData.file ? (
                  <Trash2
                    className="text-danger "
                    size={20}
                    onClick={() =>
                      setDocumentData({
                        ...documentData,
                        file: null,
                        filePreview: null,
                      })
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>

          <DocumentUpload
            label="Aadhaar"
            name="aadhaar"
            fileId="upload-aadhaar"
            valuename={formData.aadhaarname}
            numbername={formData.aadhaarnumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
            numberError={validationErrors.aadhaarnumber}
            onfieldValidation={handleValidation}
          />
          <DocumentUpload
            label="Driving License"
            name="license"
            fileId="upload-license"
            valuename={formData.licensename}
            numbername={formData.licensenumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
            numberError={validationErrors.licensenumber}
            onfieldValidation={handleValidation}
          />

          <DocumentUpload
            label="Epic (Voter)"
            name="voter"
            fileId="upload-voter"
            valuename={formData.votername}
            numbername={formData.voternumber}
            onFileChange={handleFileChange}
            onfieldChange={handleChange}
            numberError={validationErrors.voternumber}
            onfieldValidation={handleValidation}
          />

          {/*  <div className="row">
            <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
              <label>UAN</label>
              <input
                type="text"
                name="uannumber"
                placeholder="Enter UAN"
                className="form-control"
                value={formData.uannumber || ""}
                onChange={handleChange}
                    onfieldValidation={handleValidation}
              />
              {validationErrors.uannumber && (
                <small className="text-danger">
                  {validationErrors.uannumber}
                </small>
              )}
            </div>
          </div> */}
          {/* Submit Button */}
          <div className="form-group">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              disabled={loading || !isFormValid}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WidgetContentBox;
