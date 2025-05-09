'use client'
import { useState, useEffect } from 'react';
import React from 'react'
import ContactHeader from '../components/ContactHeader'
import Breadcrumb from '../components/Breadcrumb'
import FaqBody from '../components/FaqBody'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import axios from 'axios';

function Page() {

    const id = 4;
    // const { id } = params;
    console.log(id);

    const [faqDetails, setFaqDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Faq Details useEffect is running");
        const fetchFaqDetails = async () => {
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
                    setFaqDetails(res.data.PageBannerDetails);
                    console.log(faqDetails);
                } else {
                    setError('Faq Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Faq Details');
            }

        };

        fetchFaqDetails();

    }, []);


    return (
        <>
            <ContactHeader />
            {faqDetails && (
                <Breadcrumb
                    title={faqDetails.banner_title}
                    homeText="Home"
                    currentPage={faqDetails.banner_title}
                    img={faqDetails.banner_image}
                />
            )}
            <FaqBody />
            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page