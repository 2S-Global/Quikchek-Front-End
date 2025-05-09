'use client';
import React from 'react'
import ServiceBox from './ServiceBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function ActualService() {

    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Services useEffect is running");
        const fetchservices = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfServices');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Services.length > 0) {
                    setServices(res.data.Services);
                } else {
                    setError('Services data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Services Data');
            }

        };

        fetchservices();

    }, []);

    return (
        <div className="service-area-2 bg de-padding">
            <div className="container">
                <div className="service-wpr-2 service-wpp-0 grid-3">
                    {services.map((service, index) => (
                        <ServiceBox
                            key={index}
                            icon={service.service_icon}
                            title={service.title}
                            description={service.short_desc}
                            id={service.id}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ActualService