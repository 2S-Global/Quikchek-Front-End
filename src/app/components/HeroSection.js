'use client';
import React from 'react'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
function HeroSection() {
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        console.log("Hero Section useEffect is running");
        const fetchBanner = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listImagesForSlider');
                console.log(res);
                if (res.data.Ack === 1 && res.data.banners.length > 0) {
                    setBannerData(res.data.banners[0]);
                } else {
                    setError('No banner data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load banner');
            }

        };

        fetchBanner();

    }, []);

    return (
        <>
            <div
                className="hero-area pos-rel hero-overlay-2 hero-bg"
                style={{ backgroundImage: `url(${bannerData?.banner_image })`, }}
            >
                {/* <img
                    src="assets/img/bg/bg-hdr-lef234t.jpg"
                    alt="no image"
                    className="hdr-shape"
                /> */}
                <img
                    src="/assets/img/shape/wavy-1.png"
                    alt="no image"
                    className="hero-shape-3"
                />
                <div className="hero-single">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-xl-6">
                                <div className="hero-content">
                                    <div className="hero-content-desc">
                                        {/* <span className="hero-sub-title mb-20">
                                            Professional it solution ~
                                        </span> */}
                                        <h2 className="hero-title">{bannerData?.image || 'Best IT Solution Company'}</h2>
                                        {bannerData && bannerData.description && (
                                            <p className="mb-40" dangerouslySetInnerHTML={{ __html: bannerData.description }}></p>
                                        )}
                                        <div className="hero-btn">
                                            <Link href="/contact" className="btn-4 btn-md btn-circle">
                                                Contact Us
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="left-hdr-pic"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeroSection