"use client";

import FormContent2 from "../../common/form/login/FormContent2";
import { useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import MyCarousel from "../../common/carousel";
const Index = () => {
  const handlecompanyclick = () => {
    handleExternalLink("https://2sglobal.co/");
  };

  useEffect(() => {
    const token1 = localStorage.getItem("Admin_token");
    const token2 = localStorage.getItem("Super_token");

    if (token1) {
      window.location.href = "/dashboard";
    } else if (token2) {
      window.location.href = "/admin/dashboard";
    }
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#EBE8E2",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="login-section flex-grow">
          <div
            className="login-form default-form"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <FormContent2 />
          </div>
        </div>
        {/* <div className="mb-2">
          <MyCarousel />
        </div> */}
        {/* Footer */}
        <footer className="bg-light text-center text-dark py-4 mt-5 border-top mt-auto">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
              <Link href="/" className="text-muted text-decoration-none">
                Home
              </Link>
              <Link href="/about" className="text-muted text-decoration-none">
                About Us
              </Link>
              <Link href="/pricing" className="text-muted text-decoration-none">
                Pricing
              </Link>
              <Link href="/contact" className="text-muted text-decoration-none">
                Contact Us
              </Link>
              <Link href="/privacy" className="text-muted text-decoration-none">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted text-decoration-none">
                Terms & Conditions
              </Link>
              <Link href="/refund" className="text-muted text-decoration-none">
                Cancellation/Refund Policy
              </Link>
            </div>
            <div>
              <p className="mb-1">
                © {new Date().getFullYear()}{" "}
                <strong className="text-primary">Quikchek</strong>. All Rights
                Reserved.
              </p>
              {/* <p className="mb-3 text-muted small">
                Developed and maintained by{" "}
                <strong
                  className="text-dark"
                  onClick={handlecompanyclick}
                  style={{ cursor: "pointer" }}
                >
                  2S Global Technologies Ltd
                </strong>
              </p> */}
            </div>
            {/* <div className="d-flex justify-content-center gap-3">
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
            </div> */}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
