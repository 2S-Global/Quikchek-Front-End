"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerHeaderData";
/* import HeaderNavContent from "./HeaderNavContent"; */
import { isActiveLink } from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const name = localStorage.getItem("Admin_name");

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                {/*    <Link href="/"> */}
                <Image
                  alt="brand"
                  src="/images/logo.png"
                  width={154}
                  height={50}
                  priority
                />
                {/*  </Link> */}
              </div>
            </div>
          </div>
          {/* End .nav-outer */}
          <p
            className="text-center fw-large"
            style={{ color: "rgb(34,73,144)", fontSize: "2.3rem" }}
          >
            Fast &amp; Accurate{" "}
            <span style={{ color: "rgb(237,58,62)" }}>KYC</span> Verification
            Platform
          </p>

          <div className="outer-box">
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
            <div className="dropdown dashboard-option">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  alt="avatar"
                  className="thumb"
                  src="/images/resource/company-6.png"
                  width={50}
                  height={50}
                />
                <span className="name">
                  {name.length > 10 ? name.substring(0, 10) + "..." : name}
                </span>
              </a>

              <ul className="dropdown-menu">
                {employerMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, usePathname())
                        ? "active"
                        : ""
                    } mb-1`}
                    key={item.id}
                  >
                    <Link href={item.routePath}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
