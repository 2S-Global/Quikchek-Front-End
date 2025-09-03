import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DocumentUpload from "./document";
import { useRouter } from "next/navigation";
import { format, set } from "date-fns"; // Import from date-fns

import MessageComponent from "@/components/common/ResponseMsg";
import { validateDocuments } from "@/components/dashboard-pages/employers-dashboard/verify-employee/components/validateDocuments"; // adjust path as needed
import Additionfield from "./additionfield";
import PassdocumentUpload from "./pasdocument";
import TermsModal from "../../footermodal/termsmodal";

const WidgetContentBox = () => {
  const company_name = localStorage.getItem("Admin_name");
  const [selectedDoc, setSelectedDoc] = useState("PAN");
  const [ShowAll, setShowAll] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);
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
    uandoc: null,
    additionalfields: {},
    uanname: "",
    uannumber: "",
    plan: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
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
      uandoc: null,
    }));
  }, [selectedDoc]);
  /* for build */
  const handleShowTermsModal = () => {
    setShowTermsModal(true);
    document.body.style.overflow = "hidden";
  };
  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
    document.body.style.overflow = "auto";
    console.log("close modal");
  };
  const [validationErrors, setValidationErrors] = useState({});
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem("Admin_token");
  const [loading, setLoading] = useState(false);
  const [formloading, setFormLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valiError, setvaliError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const [errorId, setErrorId] = useState(0);
  const [approvedFields, setApprovedFields] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);

  //fetch approved fields list
  /* /api/companyPackageRoute/getPackageByCompanyId */
  const [isChecked, setIsChecked] = useState(false); // new state for checkbox

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const fetchAvailablePlans = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${apiurl}/api/companyPackageRoute/getPackageByCompany`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAvailablePlans(res.data.data.selected_plan || []);
      //  console.log("Available Plans:", res.data.data.selected_plan);
    } catch (err) {
      //  console.log("Error fetching plans. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /*   fetchApprovedFields(); */
    fetchAvailablePlans();
  }, []);

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
    setFormData((prevData) => {
      let fieldName = "";

      if (docType === "passport") {
        fieldName = "doc";
      } else {
        fieldName = `${docType}doc`;
      }

      return {
        ...prevData,
        [fieldName]: file || null,
      };
    });
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
        //    console.log(`${pair[0]}: ${pair[1]}`);
      }
      //  console.log(formDataToSend.additionalfields);
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
      if (!response.data.success) {
        setError(response.data.message);
        setErrorId(Date.now());
        return;
      }

      if (response.status === 201) {
        setSuccess(response.data.message);
        router.push("/paynow");
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      //   console.error("Error submitting form:", err);
      setError(err.response?.data?.message || "Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (availablePlans.length > 0 && !formData.plan) {
      setFormData((prev) => ({
        ...prev,
        plan: availablePlans[0]._id,
      }));

      handlePlanChange({ target: { value: availablePlans[0]._id } });
    }
  }, [availablePlans]);

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
  const handlePlanChange = (e) => {
    setFormLoading(true);
    const plan_id = e.target.value;
    console.log("Plan changed:", plan_id);

    const fetchApprovedFields = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${apiurl}/api/fields/list_fields_by_company`,
          { plan_id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApprovedFields(res.data.company || []);
        console.log("Approved Fields:", res.data.company);
      } catch (err) {
        //       setError("Error fetching fields. Please try again.");
      } finally {
        setLoading(false);
        setFormLoading(false);
        setFormData((prevData) => ({
          ...prevData,
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
          uandoc: null,
          additionalfields: {},
          uanname: "",
          uannumber: "",
        }));
      }
    };
    fetchApprovedFields();
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const Fetchshowallstatus = async () => {
    setLoading(true);
    try {
      /* /api/usercart/check_free_trial_demouser */
      const response = await axios.get(
        `${apiurl}/api/usercart/check_free_trial_demouser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setShowAll(response.data.trialVerificationUsed);
      }
    } catch (err) {
      console.log("Error fetching plans. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Fetchshowallstatus();
  }, [apiurl, token]);

  return (
    <>
      <div className="widget-content">
        <div className="col-lg-12 col-md-12 py-2">
          <h5>
            <strong>Add Candidate Details</strong>
          </h5>
        </div>

        <div className="row">
          <form className="default-form" onSubmit={handleSubmit}>
            <MessageComponent
              error={error}
              success={success}
              errorId={errorId}
            />
            <div className="row">
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
                  <small className="text-danger">
                    {validationErrors.phone}
                  </small>
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
                  <small className="text-danger">
                    {validationErrors.email}
                  </small>
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
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {/* plan  */}
              {/* {console.log("plans for drop down", availablePlans)} */}

              {!ShowAll && (
                <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
                  <label>Select Document</label>
                  <select
                    value={selectedDoc}
                    onChange={(e) => setSelectedDoc(e.target.value)}
                    className="form-control"
                  >
                    <option value="PAN">PAN</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DL">Driving License</option>
                    <option value="EPIC">Epic (Voter)</option>
                    {/* <option value="UAN">UAN</option> */}
                  </select>
                </div>
              )}

              {/* from anaother */}
              <Additionfield formData={formData} setFormData={setFormData} />
            </div>
            {/* if form loading */}
            {/*  {formloading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : ( */}
            <>
              {/* Conditional Rendering */}
              {(selectedDoc === "PAN" || ShowAll) && (
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
                  /*    disabled={!approvedFields.PAN} */
                />
              )}

              {(selectedDoc === "PASSPORT" || ShowAll) && (
                <PassdocumentUpload
                  label="Passport"
                  name="passport"
                  fileId="upload-passport"
                  valuename={formData.passportname}
                  numbername={formData.passportnumber}
                  numberError={validationErrors.passportnumber}
                  onFileChange={handleFileChange}
                  onfieldChange={handleChange}
                  onfieldValidation={handleValidation}
                  /*   disabled={!approvedFields.PASSPORT} */
                />
              )}

              {(selectedDoc === "DL" || ShowAll) && (
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
                  /*   disabled={!approvedFields.DL} */
                />
              )}

              {(selectedDoc === "EPIC" || ShowAll) && (
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
                  /*  disabled={!approvedFields.EPIC} */
                />
              )}

              {selectedDoc === "UAN" && (
                <DocumentUpload
                  label="UAN"
                  name="uan"
                  fileId="upload-UAN"
                  valuename={formData.uanname}
                  numbername={formData.uannumber}
                  onFileChange={handleFileChange}
                  onfieldChange={handleChange}
                  numberError={validationErrors.uannumber}
                  onfieldValidation={handleValidation}
                  disabled={!approvedFields.UAN}
                />
              )}
            </>
            {/*       )} */}

            {/* Submit Button */}
            <div className="form-group">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  This KYC verification is being done as per the request from "
                  {company_name}". The result is not for any promotional &
                  commercial purposes. I agree to all{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleShowTermsModal}
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              <button
                className="theme-btn btn-style-one"
                type="submit"
                disabled={loading || !isChecked || !isFormValid} // 👈 Button only enabled when all are valid
                style={{
                  backgroundColor:
                    loading || !isChecked || !isFormValid ? "red" : "", // Red when disabled
                  cursor:
                    loading || !isChecked || !isFormValid
                      ? "not-allowed"
                      : "pointer", // Better UX
                }}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showTermsModal && (
        <TermsModal show={showTermsModal} onClose={handleCloseTermsModal} />
      )}
    </>
  );
};

export default WidgetContentBox;
