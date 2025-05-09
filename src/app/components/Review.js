'use client'
import React from 'react'
import Image from 'next/image'
import Testimonials from './Testimonials'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Review() {

    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Testimonials useEffect is running");
        const fetchTestimonials = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/getTestimonialList');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Testimonials.length > 0) {
                    setTestimonials(res.data.Testimonials);
                } else {
                    setError('No Testimonials data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Testimonials data');
            }

        };

        fetchTestimonials();

    }, []);

    const [reviewDesc, setReviewDesc] = useState([]);
    const [reviewError, setReviewError] = useState(null);

    useEffect(() => {
        console.log("review Description useEffect is running");
        const fetchReviewDesc = async () => {
            try {
                const formData = new FormData();
                formData.append("field", "testimonial_desc");

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
                    setReviewDesc(res.data.HomeSettings);
                } else {
                    setReviewError('No review Description data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setReviewError('Failed to load review Description data');
            }

        };

        fetchReviewDesc();

    }, []);


    return (
        <div className="review-area bg de-padding">
            <div className="container container-stage">
                <div className="review-wpr">
                    <div className="row g-5">
                        <div className="col-xl-4">
                            <div className="review-left element-center">
                                <div className="review-left-content">

                                    <div
                                        dangerouslySetInnerHTML={{ __html: reviewDesc.testimonial_desc }}
                                    />

                                    {/* <h2 className="heading-2">
                                        Check out what our satisfied clients said.
                                    </h2>
                                    <p>
                                        muffin marzipan cake lemon drops cookie cake sugar plum sweet
                                        oat cake. Lollipop candy canes cotton candy shortbread
                                        shortbread biscuit chocolate
                                    </p> */}

                                    <div className="reveiw-slider-ico">
                                        <div className="swiper-button-next" />
                                        <div className="swiper-button-prev" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="review-wpr review-sldr swiper">
                                {/* Additional required wrapper */}
                                <div className="swiper-wrapper">
                                    {/* Single Item */}

                                    {testimonials.map((item) => (
                                        <Testimonials
                                            key={item.id}
                                            name={item.name}
                                            designation={item.designation}
                                            image={item.image}
                                            testimonial={item.testimonials}
                                        />
                                    ))}

                                    {/* End Single Item */}
                                </div>
                                {/* Pagination */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Review