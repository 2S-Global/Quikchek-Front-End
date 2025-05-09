'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import Work from '../components/Work';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import Termcondition from '../components/Termcondition';

function Page() {

    // For Terms & Conditions Banner
    const terms_condition_id = 4;

    const [termsConditionsBanner, setTermsConditionsBanner] = useState(null);
    const [termsConditionsError, setTermsConditionsError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Terms Conditions Banner useEffect is running");
        const fetchTermsConditionsBanner = async () => {
            try {
                const formData = new FormData();
                formData.append("cms_id", terms_condition_id);

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
                    setTermsConditionsBanner(res.data.CMSDetails);
                    console.log(termsConditionsBanner);
                } else {
                    setTermsConditionsError('Terms Conditions Banner data not found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setTermsConditionsError('Failed to load Terms Conditions Banner');
            }

        };

        fetchTermsConditionsBanner();

    }, [termsConditionsBanner]);



    return (
        <>
            <ContactHeader />
            {termsConditionsBanner && (
                <Breadcrumb
                    title={termsConditionsBanner.banner_title}
                    homeText="Home"
                    currentPage={termsConditionsBanner.banner_title}
                    img={termsConditionsBanner.banner_image}
                />
            )}

            <Termcondition />


            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page