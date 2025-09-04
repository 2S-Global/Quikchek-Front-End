"use client";

import Link from "next/link";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import axios from "axios";
import { use, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice.js";
import { usePathname } from "next/navigation";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle || {}); // Safe destructuring
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [aadhar_otp, setAadhar_otp] = useState("disable");
  const [module, setModule] = useState("disable");
  const token = localStorage.getItem("Admin_token");
  const role = localStorage.getItem("Role");

  useEffect(() => {
    const fetchAadharOtp = async () => {
      try {
        const response = await axios.post(
          `${apiurl}/api/companyPackageRoute/sidebarAadharOtp`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setAadhar_otp(response.data.aadhar_otp);
          setModule(response.data);
        }
      } catch (error) {
        console.error("Error fetching Aadhar OTP:", error);
      }
    };
    fetchAadharOtp();
  }, []);

  /* useEffect(() => {
    if (role == 3) {
      setAadhar_otp("enable");
    }
  }, [role]); */

  // menu toggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Sidebar close icon for mobile */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <div className="sidebar-inner">
        <ul className="navigation">
          <li
            className={`${
              isActiveLink("/dashboard", pathname) ? "active" : ""
            } mb-1`}
            key={1}
            onClick={menuToggleHandler}
          >
            <Link href="/dashboard">
              <i className={`la la-home`}></i> Dashboard
            </Link>
          </li>

          {role == "2" && (
            <>
              <li
                className={`${
                  isActiveLink("/owner", pathname) ? "active" : ""
                } mb-1`}
                key={299}
                onClick={menuToggleHandler}
              >
                <Link href="/owner">
                  <i className={`la la-file-alt`}></i>Owner List
                </Link>
              </li>
              <li
                className={`${
                  isActiveLink("/verify-complex", pathname) ? "active" : ""
                } mb-1`}
                key={98}
                onClick={menuToggleHandler}
              >
                <Link href="/verify-complex">
                  <i className={`la la-building`}></i>Verify Candidate
                </Link>
              </li>
            </>
          )}
          {role == "1" && (
            <li
              className={`${
                isActiveLink("/verify-employee", pathname) ? "active" : ""
              } mb-1`}
              key={98}
              onClick={menuToggleHandler}
            >
              <Link href="/verify-employee">
                <i className={`la la-building`}></i>Verify Candidate
              </Link>
            </li>
          )}
          {role == "3" && (
            <li
              className={`${
                isActiveLink("/verify-employee-user", pathname) ? "active" : ""
              } mb-1`}
              key={98}
              onClick={menuToggleHandler}
            >
              <Link href="/verify-employee-user">
                <i className={`la la-building`}></i>Verify Candidate
              </Link>
            </li>
          )}

          {/* if  aadhar_otp == "enable"*/}
          {aadhar_otp == "enable" && (
            <li
              className={`${
                isActiveLink("/aadhar-otp", pathname) ? "active" : ""
              } mb-1`}
              key={99}
              onClick={menuToggleHandler}
            >
              <Link href="/aadhar-otp">
                <i className={`la la-phone-volume`}></i> Aadhar OTP
              </Link>
            </li>
          )}

          {module.hoteltatus == "enable" && (
            <li
              className={`${
                isActiveLink("/verify-hotel", pathname) ? "active" : ""
              } mb-1`}
              key={199}
              onClick={menuToggleHandler}
            >
              <Link href="/verify-hotel">
                <i className={`la la-hotel`}></i> Hotel Module
              </Link>
            </li>
          )}

          {module.housingStatus == "enable" && (
            <li
              className={`${
                isActiveLink("/verify-housing", pathname) ? "active" : ""
              } mb-1`}
              key={999}
              onClick={menuToggleHandler}
            >
              <Link href="/verify-housing">
                <i className={`la la-building`}></i> House Module
              </Link>
            </li>
          )}
          {employerMenuData.map((item) =>
            item.is_rolebased && role != 2 ? null : (
              <li
                className={`${
                  isActiveLink(item.routePath, pathname) ? "active" : ""
                } mb-1`}
                key={item.id}
                onClick={menuToggleHandler}
              >
                <Link href={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
