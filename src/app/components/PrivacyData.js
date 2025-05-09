'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function PrivacyData() {
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
    };


    const id = 16;
    console.log(id);

    const [privacyPolicy, setPrivacyPolicy] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Privacy Policy useEffect is running");
        const fetchPrivacyPolicy = async () => {
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
                    setPrivacyPolicy(res.data.CMSDetails);
                    console.log(privacyPolicy);
                } else {
                    setError('Privacy & Policy data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Privacy & Policy data');
            }

        };

        fetchPrivacyPolicy();

    }, []);



    return (
        <div style={containerStyle}>
            {privacyPolicy ? (
                <>
                    <h1>{privacyPolicy.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: privacyPolicy.description }}
                    />
                </>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    )
}

export default PrivacyData