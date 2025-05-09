import React from 'react'
import Head from 'next/head';
import ContactHeader from '../components/ContactHeader';
import Contactmain from '../components/Contactmain';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';

function Page() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/img/logo/favicon.png" />
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
        <link href="/style.css" rel="stylesheet" />
        <link href="/assets/css/responsive.css" rel="stylesheet" />
      </Head>
      {/* ContactHeader with fixed positioning */}
      <ContactHeader
        colorCode="#000"
        style={{
          color: '#000000',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,  // Ensure it's above the map
          backgroundColor: 'white',  // Optional, for better visibility
          padding: '10px 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // Optional, adds a subtle shadow
          transition: 'all 0.3s ease-in-out',  // Optional, adds smooth transition
        }}
      />

      {/* Adjust the padding-top of the map container */}
      <Contactmain
        style={{
          paddingTop: '100px',  // Ensure map starts below the fixed header
        }}
      />

      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page