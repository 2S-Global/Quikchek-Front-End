'use client'
import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import Aboutus from '../components/Aboutus';
import NumberTalkAbout from '../components/NumberTalkAbout';
import ReviewAbout from '../components/ReviewAbout';
import Promo from '../components/Promo';
import Services from '../components/Services';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import AboutDes from '../components/AboutDes';
import ActualService from '../components/ActualService';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Page() {

    const id = 5;
    // const { id } = params;
    console.log(id);

    const [aboutDetails, setAboutDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("About Details useEffect is running");
        const fetchAboutDetails = async () => {
            try {
                const formData = new FormData();
                formData.append("cms_id", id);

                const res = await axios.post(
                    'https://2sglobal.co/staging/service/getCmsDetails',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(res);

                if (res.data.Ack === 1 && res.data.CMSDetails) {
                    setAboutDetails(res.data.CMSDetails);
                    console.log(aboutDetails);
                } else {
                    setError('About Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load About Details');
            }

        };

        fetchAboutDetails();

    }, [aboutDetails]);


    return (
        <>
            <ContactHeader />
            {aboutDetails && (
                <Breadcrumb
                    title={aboutDetails.banner_title}
                    homeText="Home"
                    currentPage={aboutDetails.banner_title}
                    img={aboutDetails.banner_image}
                />
            )}
            <AboutDes />
            <ActualService />
            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page