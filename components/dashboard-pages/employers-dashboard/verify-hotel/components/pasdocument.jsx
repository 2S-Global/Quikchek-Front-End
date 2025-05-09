import React, { useState } from "react";
import { Trash2 } from "lucide-react";
const PassdocumentUpload = ({
  label,
  name,
  fileId,
  onFileChange,
  valuename,
  numbername,
  onfieldChange,
  numberError,
  onfieldValidation,
  disabled,
}) => {
  const [inputKey, setInputKey] = useState(Date.now());
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

      if (onFileChange) {
        onFileChange(name, file);
      }
    }
  };
  return (
    <div
      className="row"
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Heading */}
      {/* Document Number Input */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label>Passport File Number</label>
        <input
          type="text"
          name={`${name}number`}
          placeholder={`Enter ${label} Number`}
          className="form-control"
          value={numbername}
          onChange={onfieldChange}
          onBlur={onfieldValidation}
        />

        {numberError && (
          <small className="text-danger" style={{ marginTop: "4px" }}>
            {numberError}
          </small>
        )}
      </div>
      {/* Name Input */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label>Name as per Passport </label>
        <input
          type="text"
          name={`${name}name`}
          placeholder={`Enter Name as per ${label}`}
          className="form-control"
          value={valuename}
          onChange={onfieldChange}
        />
      </div>

      {/* File Upload */}
      <div className="form-group col-lg-4 col-md-4 d-flex flex-column">
        <label htmlFor={fileId}>Upload Passport File</label>
        <div className="uploadButton d-flex align-items-center">
          <input
            key={inputKey}
            className="uploadButton-input"
            type="file"
            name="file"
            accept="image/*"
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
                onClick={() => window.open(documentData.filePreview, "_blank")}
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
              onClick={() => {
                setDocumentData({
                  ...documentData,
                  file: null,
                  filePreview: null,
                });
                setInputKey(Date.now());
                if (onFileChange) {
                  onFileChange(name, null); // Notify parent
                }
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PassdocumentUpload;
