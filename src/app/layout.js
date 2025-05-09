import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
// import Head from 'next/head';
import Script from "next/script";
import LoadScriptOnRouteChange from "./components/LoadScriptOnRouteChange";
import Bootstrapjs from "./components/Bootstrapjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "2S Global",
  description: "Explore our services, team, and success stories.",
  openGraph: {
    title: "2S Global",
    description: "Explore our services, team, and success stories.",
    siteName: "2S Global",
    type: "website",
    icons: {
      icon: "/assets/img/logo/favicon.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>

      <head>

        {/* <Bootstrapjs /> */}

      <Script src="/assets/js/jquery-3.7.0.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />

      <Script src="/assets/js/bsnav.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/count-to.js" strategy="afterInteractive" />
      <Script src="/assets/js/progress-bar.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.easypiechart.js" strategy="afterInteractive" />
      <Script src="/assets/js/typed.js" strategy="afterInteractive" />
      <Script src="/assets/js/YTPlayer.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery.easing.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/active-class.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery-ui.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />


        
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/logo/favicon.png" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/all.min.css" rel="stylesheet" />
        <link href="/assets/css/animate.css" rel="stylesheet" />
        <link href="/assets/css/themify-icons.css" rel="stylesheet" />
        <link href="/assets/css/icofont.min.css" rel="stylesheet" />
        <link href="/assets/css/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/css/bsnav.min.css" rel="stylesheet" />
        <link href="/assets/css/preloader.css" rel="stylesheet" />
        <link href="/assets/css/magnific-popup.css" rel="stylesheet" />
        <link href="/assets/css/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/css/flaticon.css" rel="stylesheet" />
        <link href="/assets/css/jquery-ui.css" rel="stylesheet" />
        <link href="/assets/style.css" rel="stylesheet" />
        {/* <link href="/style.css" rel="stylesheet" /> */}
        <link href="/assets/css/responsive.css" rel="stylesheet" />


      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} id="bdy">
        {/* <Preloader /> */}
        {/* <Topbar />
        <Header /> */}
        {/* <HeroSection />
        <Aboutus />
        <Services />\
        <Solve />
        <Work />
        <NumberTalks />
        <Ourexperts />
        <Promo />
        <Review />
        <Blog /> */}

        {children}
        <LoadScriptOnRouteChange />
        {/* <Footer /> */}



        {/* <Script src="/assets/js/jquery-3.7.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />

        <Script src="/assets/js/bsnav.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/count-to.js" strategy="afterInteractive" />
        <Script src="/assets/js/progress-bar.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.easypiechart.js" strategy="afterInteractive" />
        <Script src="/assets/js/typed.js" strategy="afterInteractive" />
        <Script src="/assets/js/YTPlayer.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.easing.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/active-class.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery-ui.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}
