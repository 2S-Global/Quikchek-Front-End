import React, { useState } from "react";
import axios from "axios";
import MessageComponent from "@/components/common/ResponseMsg";
import { it } from "date-fns/locale";

const AddCompanyModal = ({ show, onClose, item = {}, setReload }) => {
  const [formData, setFormData] = useState({
    _id: item._id || "",
    title: item.title || "",
    image: null,
    sort: item.sort || 0,
  });

  const [imagePreviewLink, setImagePreviewLink] = useState(
    item.image || "/images/resource/no_user.png"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [errorId, setErrorId] = useState(null);
  const [message_id, setMessage_id] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPEG and PNG files are allowed.");
      setErrorId(Date.now());
      return;
    }

    setFormData({ ...formData, image: file });
    setImagePreviewLink(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("Owner_token");
    if (!token) {
      setError("Token not found. Please log in again.");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("sort", formData.sort);
      submitData.append("image", formData.image);

      let response;
      if (formData._id) {
        submitData.append("_id", formData._id);
        response = await axios.put(
          `${apiurl}/api/marquee/edit_marquee`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${apiurl}/api/marquee/add_marquee`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }

      setSuccess(response.data.message);
      setMessage_id(Date.now());
    } catch (err) {
      setError(err.response?.data?.message || "Request failed. Try again.");
      setErrorId(Date.now());
    } finally {
      setLoading(false);
      onClose();
      setReload(true);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Slider</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body row">
              <form onSubmit={handleSubmit}>
                <MessageComponent
                  error={error}
                  success={success}
                  errorId={errorId}
                  message_id={message_id}
                />

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Company Name"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Sort</label>
                    <input
                      type="number"
                      name="sort"
                      className="form-control"
                      placeholder="Sort Order"
                      required
                      value={formData.sort}
                      onChange={(e) =>
                        setFormData({ ...formData, sort: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Image Preview */}
                  <div className="mb-3 col-md-6 text-center">
                    <img
                      src={imagePreviewLink}
                      alt="Preview"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "150px",
                        objectFit: "contain",
                        border: "1px solid #ccc",
                        padding: "4px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCompanyModal;
