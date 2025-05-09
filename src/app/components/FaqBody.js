'use client';
import React from 'react'
import FaqDetails from './FaqDetails';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FaqBody() {

    const [faqData, setFaqData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Faq Data useEffect is running");
        const fetchFaq = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfFAQ');
                console.log(res);
                if (res.data.Ack === 1 && res.data.FAQ.length > 0) {
                    setFaqData(res.data.FAQ);
                } else {
                    setError('No Faq data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Faq Data');
            }

        };

        fetchFaq();

    }, []);

    return (
        <div className="faq-area pos-rel de-padding">
            <div className="container">
                <div className="faq-wpr">
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3">
                            <div className="course-accordion">
                                <div className="accordion" id="accordionExample">


                                    {faqData.map((item, index) => (
                                        <FaqDetails key={index} item={item} index={index} />
                                    ))}



                                    {/* {data.map((item, index) => (
                                        <FaqDetails key={index} item={item} index={index} />
                                    ))} */}

                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                How much it will cost For Web Design?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    In business, time is money. So, when you have a problem
                                                    that is putting your business on hold, a quick response
                                                    rate is critical. It’s actually one of the main criteria
                                                    when it comes to IT support, if not the deal-breaker. It’s
                                                    better to know what to expect upfront than to find out in
                                                    the middle of an IT crisis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                How long does it takes to complete the Web Design?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample"
                                            style={{}}
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    In business, time is money. So, when you have a problem
                                                    that is putting your business on hold, a quick response
                                                    rate is critical. It’s actually one of the main criteria
                                                    when it comes to IT support, if not the deal-breaker. It’s
                                                    better to know what to expect upfront than to find out in
                                                    the middle of an IT crisis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                How should I proceed to engage your web design services?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    In business, time is money. So, when you have a problem
                                                    that is putting your business on hold, a quick response
                                                    rate is critical. It’s actually one of the main criteria
                                                    when it comes to IT support, if not the deal-breaker. It’s
                                                    better to know what to expect upfront than to find out in
                                                    the middle of an IT crisis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                What if I want to customize additional function for my
                                                website?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    In business, time is money. So, when you have a problem
                                                    that is putting your business on hold, a quick response
                                                    rate is critical. It’s actually one of the main criteria
                                                    when it comes to IT support, if not the deal-breaker. It’s
                                                    better to know what to expect upfront than to find out in
                                                    the middle of an IT crisis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                What if I want additional section for my website?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    In business, time is money. So, when you have a problem
                                                    that is putting your business on hold, a quick response
                                                    rate is critical. It’s actually one of the main criteria
                                                    when it comes to IT support, if not the deal-breaker. It’s
                                                    better to know what to expect upfront than to find out in
                                                    the middle of an IT crisis.
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FaqBody