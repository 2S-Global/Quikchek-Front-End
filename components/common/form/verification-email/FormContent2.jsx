"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import MessageComponent from "../../ResponseMsg";
import { Eye, EyeOff } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa"
import Link from "next/link"; 

const FormContent2 = ({ error, success }) => {
  const router = useRouter();


  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  
  const handlecompanyclick = () => {
    handleExternalLink("https://2sglobal.co/");
  };
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };



  if (!success) return null;



  



  

  return (
    
    <div className="form-inner pb-4">
      <div className="mb-3 d-flex justify-content-center pb-4 pt-4">
        <Image alt="brand" src="/images/logo.png" width={214} height={70} priority />
      </div>

      <h3>Email Verification</h3>
      <MessageComponent error={error} success={success} />
      {success && (
  <div className="d-flex justify-content-center align-items-center mt-4">
    <FaCheckCircle color="green" size={30} />
    <p className="ms-2 text-success">{success}</p> {/* Show dynamic message */}
  </div>
)}

{error && (
  <div className="d-flex justify-content-center align-items-center mt-4">
    <FaExclamationCircle color="red" size={30} />
    <p className="ms-2 text-danger">{error}</p>
  </div>
)}

        <div className="mt-4 text-center">
        <p>
          <Link href="/" className="text-primary" style={{ textDecoration: "underline" }}>
            Go to Login
          </Link>
        </p>
      </div>


   <div className="mt-5 text-center">
        <p className="text-muted small">
          Developed and maintained by{" "}
          <strong
            className="text-dark"
            onClick={handlecompanyclick}
            style={{ cursor: "pointer" }}
          >
            2S Global Technologies Ltd
          </strong>
        </p>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                onClick={() =>
                  handleExternalLink(
                    "https://www.facebook.com/profile.php?id=61575548305003"
                  )
                }
                className="btn btn-outline-primary rounded-circle"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </button>
              <button
                onClick={() =>
                  handleExternalLink(
                    "https://www.linkedin.com/company/global-employability-information-services-india-limited/"
                  )
                }
                className="btn btn-outline-primary rounded-circle"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </button>
            </div>
      
    </div>
  );
};

export default FormContent2;
