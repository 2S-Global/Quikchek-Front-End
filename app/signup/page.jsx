"use client";

// import FormContent2 from "../../common/form/login/FormContent2";0
import FormContent2 from "../../components/common/form/signup/FormContent2";
//import MobileMenu from "../../header/MobileMenu";
//import Header from "./Header";
import { useEffect } from "react";

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
      </div>
    </>
  );
};

export default Index;
