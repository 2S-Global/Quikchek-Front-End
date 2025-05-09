'use client'
import { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader'
import Footer from '@/app/components/Footer'
import ScrollTop from '@/app/components/ScrollTop'
import Breadcrumb from '@/app/components/Breadcrumb'
import CaseStudyCard from '@/app/components/CaseStudyCard'
import CaseStudyDesc from '@/app/components/CaseStudyDesc'


function Page({ params }) {

  const { id } = use(params)
  // const { id } = params;
  console.log({ id });

  const [caseStudyDetails, setCaseStudyDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    console.log("Case Study Details useEffect is running");
    const fetchCaseStudyDetails = async () => {
      try {
        const formData = new FormData();
        formData.append("case_study_id", id);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getCaseStudyDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log(res);

        if (res.data.Ack === 1 && res.data.CaseStudyDetails) {
          setCaseStudyDetails(res.data.CaseStudyDetails);
        } else {
          setError('No Case Study Details data found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setError('Failed to load Case Study Details');
      }

    };

    fetchCaseStudyDetails();

  }, [id]);


  // For Blog Details Banner
  const case_study_id = 12;

  const [caseStudyBanner, setCaseStudyBanner] = useState(null);
  const [caseStudyError, setCaseStudyError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    console.log("Case Study Banner useEffect is running");
    const fetchCaseStudyBanner = async () => {
      try {
        const formData = new FormData();
        formData.append("page_id", case_study_id);

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
          setCaseStudyBanner(res.data.PageBannerDetails);
          console.log(caseStudyBanner);
        } else {
          setCaseStudyError('Blog Banner data not found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setCaseStudyError('Failed to load Blog Banner');
      }

    };

    fetchCaseStudyBanner();

  }, [caseStudyBanner]);


  return (
    <>
      <ContactHeader />

      {caseStudyBanner && (
        <Breadcrumb
          title={caseStudyBanner.banner_title}
          homeText="Home"
          currentPage={caseStudyBanner.banner_title}
          img={caseStudyBanner.banner_image}
        />
      )}

      {caseStudyDetails && (
        <CaseStudyDesc
          title={caseStudyDetails.title}
          image={caseStudyDetails.image}
          description={caseStudyDetails.description}
          pdf={caseStudyDetails.pdf}
        />
      )}

      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page