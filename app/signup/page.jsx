"use client";

// import FormContent2 from "../../common/form/login/FormContent2";0
import FormContent2 from "../../components/common/form/signup/FormContent2";
//import MobileMenu from "../../header/MobileMenu";
//import Header from "./Header";
import { useEffect } from "react";
import Link from "next/link";

const Index = () => {
  useEffect(() => {
    // Disable scrolling
    // document.body.style.overflow = "hidden";

    return () => {
      // Enable scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#EBE8E2" }}>
        {/*  <Header /> */}
        {/* <!--End Main Header -->  */}

        {/* <MobileMenu /> */}
        {/* End MobileMenu */}

        <div className="login-section">
          {/*  <div
          className="image-layer"
          style={{ backgroundImage: "url(/images/background/12.jpg)" }}
        ></div> */}
          {/*     <div className="outer-box"> */}
          {/* <!-- Login Form --> */}
          <div
            className="login-form default-form "
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <FormContent2 />
          </div>
          {/* <!--End Login Form --> */}
          {/*  </div> */}
        </div>
        {/* <!-- End Info Section --> */}
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
