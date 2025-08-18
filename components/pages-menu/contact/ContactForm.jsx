import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // TODO: send data to backend / API here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          <div className="response"></div>
        </div>

        {/* Name */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Name</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email */}
        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Email</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        {/* Subject */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Subject</label>
          <span className="text-danger ms-1">*</span>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject "
            required
          />
        </div>

        {/* Message */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <span className="text-danger ms-1">*</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            id="submit"
            name="submit-form"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
