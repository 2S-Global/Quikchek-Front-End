'use client'
import { useState, useEffect } from 'react';
import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import Work from '../components/Work';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import axios from 'axios';

function Page() {

    const id = 3;
    // const { id } = params;
    console.log(id);

    const [projectDetails, setProjectDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Project Details useEffect is running");
        const fetchProjectDetails = async () => {
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
                    setProjectDetails(res.data.PageBannerDetails);
                    console.log(projectDetails);
                } else {
                    setError('Project Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Project Details');
            }

        };

        fetchProjectDetails();

    }, []);

    return (
        <>
            <ContactHeader />
            {projectDetails && (
                <Breadcrumb
                    title={projectDetails.banner_title}
                    homeText="Home"
                    currentPage={projectDetails.banner_title}
                    img={projectDetails.banner_image}
                />
            )}
            <Work />
            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page