import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import TotalSingleBlog from '../components/TotalSingleBlog';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';

function Page() {
  return (
    <>
     <ContactHeader />
     <Breadcrumb />
     <TotalSingleBlog />
     <Footer />
     <ScrollTop />
    </>
  )
}

export default Page