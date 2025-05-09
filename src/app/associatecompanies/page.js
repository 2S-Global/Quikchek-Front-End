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
import CaseStudyMain from '../components/CaseStudyMain';
import AssociateComDetails from '../components/AssociateComDetails';

function Page() {

    const id = 13;
    // const { id } = params;
    console.log(id);

    const [associateComBanner, setAssociateComBanner] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Associate Com Banner useEffect is running");
        const fetchAssociateComBanner = async () => {
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
                    setAssociateComBanner(res.data.PageBannerDetails);
                    console.log(associateComBanner);
                } else {
                    setError('About Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load About Details');
            }

        };

        fetchAssociateComBanner();

    }, []);





    // const [associateCom, setAssociateCom] = useState([]);
    // const [associateComError, setAssociateComError] = useState(null);

    // useEffect(() => {
    //     console.log("Associate Companies useEffect is running");
    //     const fetchAssociateCom = async () => {
    //         try {
    //             const res = await axios.post('https://2sglobal.co/staging/service/listOfAssociateCompanies');
    //             console.log(res);
    //             if (res.data.Ack === 1 && res.data.AssociateCompanies.length > 0) {
    //                 setAssociateCom(res.data.AssociateCompanies);
    //             } else {
    //                 setError('No Associate Companies data found');
    //             }
    //         } catch (err) {
    //             console.error('Axios error:', err);
    //             setError('Failed to load Associate Companies Data');
    //         }

    //     };

    //     fetchAssociateCom();

    // }, []);




    return (
        <>
            <ContactHeader />
            {associateComBanner && (
                <Breadcrumb
                    title={associateComBanner.banner_title}
                    homeText="Home"
                    currentPage={associateComBanner.banner_title}
                    img={associateComBanner.banner_image}
                />
            )}

            <AssociateComDetails />

            <Footer />
            <ScrollTop />
        </>
    )
}

export default Page