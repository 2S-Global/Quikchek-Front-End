"use client";
import MobileMenu from "../../../header/AdminMobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";

import CopyrightFooter from "../../CopyrightFooter";

import Companytable from "./components/table";

import AddCompanyModal from "./components/modals/addcompany";
import AddCsvModal from "./components/modals/csv";
import { useState } from "react";
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const openModalRH = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const openCsvModal = () => {
    setIsCsvModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModalRH = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };

  const closeModalCsv = () => {
    setIsCsvModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable background scrolling
  };
  return (
    <>
      <div className="page-wrapper dashboard ">
        <span className="header-span"></span>
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <DashboardEmployerSidebar /> */}
        <DashboardEmployerSidebar />
        {/* <!-- End User Sidebar Menu --> */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12">
                <div className="applicants-widget ls-widget">
                  <div
                    className="widget-title"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Owner List</h4>

                    <div style={{ display: "flex", gap: "15px" }}>
                      <span
                        onClick={openModalRH}
                        style={{
                          cursor: "pointer",
                          color: "#275df5",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        Add Owner
                      </span>

                      <span
                        onClick={openCsvModal}
                        style={{
                          cursor: "pointer",
                          color: "#13cfcf",
                          fontWeight: 500,
                          fontSize: "16px",
                        }}
                      >
                        Import From Excel
                      </span>
                    </div>
                  </div>
                  <Companytable />
                </div>
              </div>
            </div>
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
      {/* Render Modal if isModalOpen is true */}
      {isModalOpen && (
        <AddCompanyModal show={isModalOpen} onClose={closeModalRH} />
      )}

      {isCsvModalOpen && (
        <AddCsvModal show={openCsvModal} onClose={closeModalCsv} />
      )}
    </>
  );
};

export default Index;
