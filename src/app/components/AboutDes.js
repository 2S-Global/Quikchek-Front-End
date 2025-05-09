'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function AboutDes() {
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
    };

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
        <div style={containerStyle}>
            {aboutDetails ? (
                <>
                    <h1>{aboutDetails.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: aboutDetails.description }}
                    />
                </>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    )
}

export default AboutDes