"use client";

import FormContent2 from "../../common/form/login/FormContent2";
import { useEffect } from "react";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#EBE8E2",
          minHeight: "100vh",
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

        {/* Sticky Footer */}
        <footer className="bg-light text-center text-muted py-3">
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
              &copy; {new Date().getFullYear()} QuikChek by 2S Global
              Technologies Limited
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
