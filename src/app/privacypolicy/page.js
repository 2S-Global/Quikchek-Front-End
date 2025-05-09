'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import Work from '../components/Work';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import PrivacyData from '../components/PrivacyData';

function Page() {

    // For Privacy Policy Banner
    const privacy_policy_id = 16;

    const [privacyPolicyBanner, setPrivacyPolicyBanner] = useState(null);
    const [privacyPolicyError, setPrivacyPolicyError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Privacy Policy Banner useEffect is running");
        const fetchPrivacyPolicyBanner = async () => {
            try {
                const formData = new FormData();
                formData.append("cms_id", privacy_policy_id);

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
                    setPrivacyPolicyBanner(res.data.CMSDetails);
                    console.log(privacyPolicyBanner);
                } else {
                    setPrivacyPolicyError('Privacy Policy Banner data not found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setPrivacyPolicyError('Failed to load Privacy Policy Banner');
            }

        };

        fetchPrivacyPolicyBanner();

    }, [privacyPolicyBanner]);


    return (
        <>
            <ContactHeader />
            {privacyPolicyBanner && (
                <Breadcrumb
                    title={privacyPolicyBanner.banner_title}
                    homeText="Home"
                    currentPage={privacyPolicyBanner.banner_title}
                    img={privacyPolicyBanner.banner_image}
                />
            )}

            <PrivacyData />

            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page