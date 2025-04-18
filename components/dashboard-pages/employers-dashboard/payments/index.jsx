import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";

import { useState } from "react";

//component
import PaymentDetails from "./component/paynowtable";
import WalletBalance from "./component/wallet";
const index = () => {
  const [showTable, setShowTable] = useState(true);

  return (
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

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard d-flex flex-column min-vh-100">
        <div className="dashboard-outer flex-grow-1">
          {/*   <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-content">
                    <div className="table-outer">
                      <WalletBalance
                        showTable={showTable}
                        setShowTable={setShowTable}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {showTable && (
            <div className="row">
              <div className="col-lg-12">
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Transaction History</h4>
                    </div>
                    <div className="widget-content">
                      <div className="table-outer">
                        <PaymentDetails />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- End Applicants Widget --> */}
            </div>
          )}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
