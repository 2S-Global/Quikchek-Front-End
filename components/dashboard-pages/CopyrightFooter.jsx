"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import TermsModal from "./employers-dashboard/footermodal/termsmodal";
import PrivacyModal from "./employers-dashboard/footermodal/privacymodal";
const CopyrightFooter = () => {
  const router = useRouter();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleShowTermsModal = () => {
    setShowTermsModal(true);
    document.body.style.overflow = "hidden";
  };
  const handleClosePrivacyModal = () => {
    setShowPrivacyModal(false);
    document.body.style.overflow = "auto";
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
    document.body.style.overflow = "auto";
    console.log("close modal");
  };

  const handleShowPrivacyModal = () => {
    setShowPrivacyModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  const handleExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handlecompanyclick = () => {
    handleExternalLink("https://2sglobal.co/");
  };

  return (
    <>
      <footer className="bg-light text-dark py-4 mt-5 border-top">
        <div className="container text-center">
          <p className="mb-1">
            © {new Date().getFullYear()}{" "}
            <strong className="text-primary">Quikchek</strong>. All Rights
            Reserved.
          </p>
          <p className="mb-3 text-muted small">
            Developed and maintained by{" "}
            <strong
              className="text-dark"
              onClick={handlecompanyclick}
              style={{ cursor: "pointer" }}
            >
              2S Global Technologies Ltd
            </strong>
          </p>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <button
              onClick={handleShowTermsModal}
              className="btn btn-link p-0 text-decoration-none text-primary"
            >
              Terms & Conditions
            </button>
            <button
              onClick={handleShowPrivacyModal}
              className="btn btn-link p-0 text-decoration-none text-primary"
            >
              Privacy Policy
            </button>
          </div>

          <div className="d-flex justify-content-center gap-3">
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
      </footer>
      {showTermsModal && (
        <TermsModal show={showTermsModal} onClose={handleCloseTermsModal} />
      )}
      {showPrivacyModal && (
        <PrivacyModal
          show={showPrivacyModal}
          onClose={handleClosePrivacyModal}
        />
      )}
    </>
  );
};

export default CopyrightFooter;
