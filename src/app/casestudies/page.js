'use client'
import React from 'react'
import ContactHeader from '../components/ContactHeader'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import Breadcrumb from '../components/Breadcrumb'
import CaseStudyCard from '../components/CaseStudyCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CaseStudyMain from '../components/CaseStudyMain'

function Page() {

    const [caseStudies, setCaseStudies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Case Studies useEffect is running");
        const fetchCaseStudies = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfCaseStudies');
                console.log(res);
                if (res.data.Ack === 1 && res.data.CaseStudies.length > 0) {
                    setCaseStudies(res.data.CaseStudies);
                } else {
                    setError('No Case Studies data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Case Studies Data');
            }

        };

        fetchCaseStudies();

    }, []);


    const id = 10;
    // const { id } = params;
    console.log(id);

    const [caseStudyBanner, setCaseStudyBanner] = useState(null);
    const [caseError, setCaseError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Case Study Banner useEffect is running");
        const fetchCaseStudyBanner = async () => {
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
                    setCaseStudyBanner(res.data.PageBannerDetails);
                    console.log(caseStudyBanner);
                } else {
                    setCaseError('Case Study Banner data not found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setCaseError('Failed to load Case Study Banner');
            }

        };

        fetchCaseStudyBanner();

    }, []);



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

            <CaseStudyMain />

            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page