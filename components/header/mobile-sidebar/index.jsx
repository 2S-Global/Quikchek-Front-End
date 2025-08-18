"use client";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import mobileMenuData from "../../../data/mobileMenuDatatry";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();
  const apiurl = process.env.NEXT_PUBLIC_API_URL;

  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [aadharOtp, setAadharOtp] = useState("disable");
  const [modules, setModules] = useState(null);

  // ✅ Get role & token from localStorage only on client side
  useEffect(() => {
    setRole(localStorage.getItem("Role"));
    setToken(localStorage.getItem("Admin_token"));
  }, []);

  // ✅ Fetch Aadhar OTP once token is available
  useEffect(() => {
    if (!token) return;

    const fetchAadharOtp = async () => {
      try {
        const { data } = await axios.post(
          `${apiurl}/api/companyPackageRoute/sidebarAadharOtp`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setAadharOtp(data.aadhar_otp);
          setModules(data);
        }
      } catch (error) {
        console.error("Error fetching Aadhar OTP:", error);
      }
    };

    fetchAadharOtp();
  }, [token, apiurl]);

  // ✅ Small helper for routing
  const goTo = (path) => router.push(path);

  // ✅ Role-based menu definitions
  const roleMenus = {
    2: [
      { path: "/owner", label: "Owner List" },
      { path: "/verify-complex", label: "Verify Candidate" },
    ],
    1: [{ path: "/verify-employee", label: "Verify Candidate" }],
  };

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />

      <Sidebar>
        <Menu>
          {/* Dashboard */}
          <MenuItem
            onClick={() => goTo("/dashboard")}
            className={
              isActiveLink("/dashboard", pathname) ? "menu-active-link" : ""
            }
            key="dashboard"
          >
            Dashboard
          </MenuItem>

          {/* Role-based menus */}
          {role &&
            roleMenus[role]?.map((item) => (
              <MenuItem
                key={item.path}
                className={`${isActiveLink(item.path, pathname) ? "active" : ""} mb-1`}
                onClick={() => goTo(item.path)}
              >
                {item.label}
              </MenuItem>
            ))}

          {/* Aadhar OTP */}
          {aadharOtp === "enable" && (
            <MenuItem
              key="aadhar-otp"
              className={`${isActiveLink("/aadhar-otp", pathname) ? "active" : ""} mb-1`}
              onClick={() => goTo("/aadhar-otp")}
            >
              Aadhar OTP
            </MenuItem>
          )}

          {/* Dynamic menu from mobileMenuData */}
          {mobileMenuData.map((item) =>
            item.items?.length > 0 ? (
              <SubMenu
                key={item.id}
                label={item.label}
                className={
                  isActiveParentChaild(item.items, pathname)
                    ? "menu-active"
                    : ""
                }
              >
                {item.items.map((menuItem) => (
                  <MenuItem
                    key={menuItem.routePath}
                    onClick={() => goTo(menuItem.routePath)}
                    className={
                      isActiveLink(menuItem.routePath, pathname)
                        ? "menu-active-link"
                        : ""
                    }
                  >
                    {menuItem.label}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                key={item.id}
                onClick={() => {
                  if (item.id === 9) {
                    localStorage.clear();
                    goTo("/");
                  } else {
                    goTo(item.routePath);
                  }
                }}
                className={
                  isActiveLink(item.routePath, pathname)
                    ? "menu-active-link"
                    : ""
                }
              >
                {item.label}
              </MenuItem>
            )
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Index;
