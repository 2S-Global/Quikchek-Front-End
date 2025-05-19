import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardAdminheader";
import DashboardEmployerSidebar from "../../../header/DashboardAdminsidebar";

import CopyrightFooter from "../../CopyrightFooter";
import Form from "./components/form";

const Index = () => {
  return (
    <div className="d-flex flex-column min-vh-100 page-wrapper dashboard">
      <span className="header-span"></span>
      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      {/* Make this section flexible */}
      <div className="flex-grow-1">
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <div className="row">
              <div className="col-lg-12">
                <div className="applicants-widget ls-widget">
                  <div className="widget-content">
                    <div className="col-lg-12 col-md-12 py-2">
                      <h5>
                        <strong>Generate Report</strong>
                      </h5>
                    </div>
                    <Form />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CopyrightFooter />
    </div>
  );
};

export default Index;
