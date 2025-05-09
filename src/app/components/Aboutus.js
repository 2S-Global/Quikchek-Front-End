'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import axios from 'axios'
import { useEffect, useState } from 'react'
function Aboutus() {


    const [aboutUsContent, setAboutUsContent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Home Page About Us useEffect is running");
        const fetchAboutUsContent = async () => {
            try {
                const formData = new FormData();
                formData.append("field", "about_us");

                const res = await axios.post(
                    'https://2sglobal.co/staging/service/getHomeSettings',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(res);

                if (res.data.Ack === 1 && res.data.HomeSettings) {
                    setAboutUsContent(res.data.HomeSettings);
                } else {
                    setError('No About Us Content Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load About Us Content Details');
            }

        };

        fetchAboutUsContent();

    }, []);

    if (error) return <p>{error}</p>;
    if (!aboutUsContent) return <p>Loading...</p>;

    // Now it's safe to split
    const contentLines = aboutUsContent.about_us_content
        .split('\n')
        .filter(line => line.trim() !== '');

    return (
        <div className="about-area pos-rel de-padding">
            <img src="/assets/img/bg/bg-about.png" alt="no image" className="about-bg" />
            <div className="container">
                <div className="about-wpr grid-2">
                    <div className="about-left pr-60">
                        <div className="about-left-content">

                            <div
                                dangerouslySetInnerHTML={{ __html: aboutUsContent.about_us_content }}
                            />
                            
                            <div className="about-btn-content">
                                <Link href="/aboutus" className="btn-1">
                                    Know More
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="about-right">
                        <img src={aboutUsContent.about_us_img} alt="no image" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Aboutus