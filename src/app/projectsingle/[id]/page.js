'use client'
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader';
import Breadcrumb from '@/app/components/Breadcrumb';
import SingleProjectBody from '@/app/components/SingleProjectBody';
import Footer from '@/app/components/Footer';
import ScrollTop from '@/app/components/ScrollTop';
import { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'

function Page({ params }) {

    const { id } = use(params)
    // const { id } = params;
    console.log({ id });

    const [projectDetails, setProjectDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        console.log("Project Details useEffect is running");
        const fetchProjectDetails = async () => {
            try {
                const formData = new FormData();
                formData.append("project_id", id);

                const res = await axios.post(
                    'https://2sglobal.co/staging/service/getProjectDetails',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(res);

                if (res.data.Ack === 1 && res.data.ProjectDetails) {
                    setProjectDetails(res.data.ProjectDetails);
                } else {
                    setError('No Project Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Project Details');
            }

        };

        fetchProjectDetails();

    }, [id]);


    // For Project Banner
    const banner_id = 8;

    const [projectBanner, setProjectBanner] = useState(null);
    const [projectError, setProjectError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Project Banner useEffect is running");
        const fetchProjectBanner = async () => {
            try {
                const formData = new FormData();
                formData.append("page_id", banner_id);

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
                    setProjectBanner(res.data.PageBannerDetails);
                    console.log(projectBanner);
                } else {
                    setProjectError('Project Banner data not found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setProjectError('Failed to load Project Banner');
            }

        };

        fetchProjectBanner();

    }, [projectBanner]);


    return (
        <>
            <ContactHeader />

            {projectBanner && (
                <Breadcrumb
                    title={projectBanner.banner_title}
                    homeText="Home"
                    currentPage={projectBanner.banner_title}
                    img={projectBanner.banner_image}
                />
            )}

            {projectDetails && (
                <SingleProjectBody
                    title={projectDetails.title}
                    image={projectDetails.image}
                    description={projectDetails.description}
                />
            )}
            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page