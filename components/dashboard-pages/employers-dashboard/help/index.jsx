import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";

import CopyrightFooter from "../../CopyrightFooter";
import ContactForm from "@/components/pages-menu/contact/ContactForm";
const index = () => {
  return (
    <>
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>
        {/* <!-- Header Span for hight --> */}

        <LoginPopup />
        {/* End Login Popup Modal */}

        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        <DashboardEmployerSidebar />
        {/* <!-- End User Sidebar Menu --> */}
        <section className="user-dashboard d-flex flex-column min-vh-100">
          <div className="dashboard-outer flex-grow-1">
            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Leave A Message</h4>
                    </div>
                    {/* End widget-title */}

                    <div className="widget-content contact-form default-form">
                      <ContactForm dispute={true} />
                    </div>
                    {/* End widget-content */}
                  </div>
                </div>
                {/* <!-- Ls widget --> */}
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End dashboard-outer */}
        </section>

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </>
  );
};

export default index;
