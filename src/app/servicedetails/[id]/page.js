'use client'
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader'
import Footer from '@/app/components/Footer'
import Breadcrumb from '@/app/components/Breadcrumb'
import ScrollTop from '@/app/components/ScrollTop'
import { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'
import ServiceBox from '@/app/components/ServiceBox'

function Page({ params }) {
    const { id } = use(params)
    // const { id } = params;
    console.log({ id });

    const [serviceDetails, setServiceDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        console.log("Service Details useEffect is running");
        const fetchServiceDetails = async () => {
            try {
                const formData = new FormData();
                formData.append("service_id", id);

                const res = await axios.post(
                    'https://2sglobal.co/staging/service/getServiceDetails',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(res);

                if (res.data.Ack === 1 && res.data.ServiceDetails) {
                    setServiceDetails(res.data.ServiceDetails);
                } else {
                    setError('No Service Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Service Details');
            }

        };

        fetchServiceDetails();

    }, [id]);


    // For Service Details Banner
    const service_id = 11;

    const [serviceBanner, setServiceBanner] = useState(null);
    const [serviceError, setServiceError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Service Banner useEffect is running");
        const fetchServiceBanner = async () => {
            try {
                const formData = new FormData();
                formData.append("page_id", service_id);

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
                    setServiceBanner(res.data.PageBannerDetails);
                    console.log(serviceBanner);
                } else {
                    setServiceError('Service Banner data not found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setServiceError('Failed to load Service Banner');
            }

        };

        fetchServiceBanner();

    }, [serviceBanner]);




    return (
        <>
            <ContactHeader />
            {serviceBanner && (
                <Breadcrumb
                    title={serviceBanner.banner_title}
                    homeText="Home"
                    currentPage={serviceBanner.banner_title}
                    img={serviceBanner.banner_image}
                />
            )}


            <div className="service-area-2 bg de-padding" >
                <div className="container"  >
                    <div className="service-wpr-2 service-wpp-0 grid-3" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // minHeight: '100vh', // ensures full screen height
                        textAlign: 'center' // optional: centers text inside
                    }}>
                        {serviceDetails && (
                            <div className="service-box-2">
                                <div className="service-icon-2">
                                    <i className={serviceDetails.service_icon}>
                                        <span></span>
                                    </i>
                                </div>
                                <div className="service-desc-2">
                                    <h4 className="heading-4">{serviceDetails.title}</h4>
                                    <p dangerouslySetInnerHTML={{ __html: serviceDetails.description }}></p>
                                    {/* <p>{serviceDetails.description}</p> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page