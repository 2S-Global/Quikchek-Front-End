import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import TermsText from "./TermsText";

const index = () => {
  return (
    <>
      <section className="about-section-three">
        <div className="auto-container">
          {/* End sec-title */}
          <TermsText />
        </div>
      </section>
    </>
  );
};

export default index;
