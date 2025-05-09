'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Termcondition() {
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
    };


    const id = 4;
    console.log(id);

    const [termsCond, setTermsCond] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // if (!id) return;
        console.log("Terms & Conditions useEffect is running");
        const fetchTermsCond = async () => {
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
                    setTermsCond(res.data.CMSDetails);
                    console.log(termsCond);
                } else {
                    setError('Terms & Conditions data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Terms & Conditions');
            }

        };

        fetchTermsCond();

    }, []);

    return (
        <div style={containerStyle}>
            {termsCond ? (
                <>
                    <h1>{termsCond.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: termsCond.description }}
                    />
                </>
            ) : (
                !error && <p>Loading...</p>
            )}
        </div>
    )
}

export default Termcondition