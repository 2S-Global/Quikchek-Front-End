import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import Aboutus from "./components/Aboutus";
import Services from "./components/Services";
import Solve from "./components/Solve";
import Work from "./components/Work";
import NumberTalks from "./components/NumberTalks";
import Preloader from "./components/Preloader";
import Topbar from "./components/Topbar";
import Ourexperts from "./components/Ourexperts";
import Promo from "./components/Promo";
import Review from "./components/Review";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import ContactHeader from "./components/ContactHeader";
import TeamPeople from "./components/TeamPeople";
import HomeTechnology from "./components/HomeTechnology";
import ActualService from "./components/ActualService";

export default function Home() {
  return (
    <>
      <Topbar />
      <ContactHeader />
      <HeroSection />
      <Aboutus />
      <HomeTechnology />
      {/* <Services /> */}
      <ActualService />
      <Solve />
      <Work />
      <NumberTalks />
      <Ourexperts />
      <Review />
      <Blog />
      <Footer />
      <ScrollTop />
    </>
  );
}