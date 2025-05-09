'use client'
import { useState, useEffect } from 'react';
import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import ActualService from '../components/ActualService';
import NumberTalks from '../components/NumberTalks';
import Solve from '../components/Solve';
import PlanPricing from '../components/PlanPricing';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import axios from 'axios';

function Page() {

  const id = 1;
  // const { id } = params;
  console.log(id);

  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    console.log("Service Details useEffect is running");
    const fetchServiceDetails = async () => {
      try {
        const formData = new FormData();
        formData.append("page_id", id);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getPageBannerDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log(res);

        if (res.data.Ack === 1 && res.data.PageBannerDetails) {
          setServiceDetails(res.data.PageBannerDetails);
          console.log(serviceDetails);
        } else {
          setError('Service Details data found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setError('Failed to load Service Details');
      }

    };

    fetchServiceDetails();

  }, []);

  return (
    <>
      <ContactHeader />
      {serviceDetails && (
        <Breadcrumb
          title={serviceDetails.banner_title}
          homeText="Home"
          currentPage={serviceDetails.banner_title}
          img={serviceDetails.banner_image}
        />
      )}
      <ActualService />
      <Solve />
      <NumberTalks className="de-padding" />
      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page