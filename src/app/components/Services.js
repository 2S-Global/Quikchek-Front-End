'use client';
import React from 'react'
import Link from 'next/link';
import ActualService from './ActualService';

function services() {
    return (
        <div className="service-area pos-rel bg de-padding overflow-hidden">
            {/* <img
                src="/assets/img/shape/service-wavy.png"
                alt="no image"
                className="service-wavy"
            /> */}
            <div className="container">
                {/* <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-title text-center">
                            <p className="hero-sub-title">Our Services</p>
                            <div className="site-title-shape text-center mb-4">
                                <img src="/assets/img/shape/site-title-shape.png" alt="no image" />
                            </div>
                            <h2 className="up-title mb-0">
                                We provide best services <br /> for your business
                            </h2>
                        </div>
                    </div>
                </div> */}
                {/* <ActualService /> */}
                <div className="service-wpr grid-8">

                    <ActualService />


                    {/* <div className="service-box">
                        <img
                            src="/assets/img/shape/shape-service.png"
                            alt="no image"
                            className="service-shape"
                        />
                        <div className="service-icon">
                            <i className="custom-icon">
                                <img src="/assets/img/icon/service-trans-1.png" alt="no image" />
                            </i>
                        </div>
                        <div className="service-desc">
                            <h4 className="heading-4">Digital Marketing</h4>
                            <p>
                                Curabitur blandit mi liberonec consequat nulla rutrum inonec
                                eleifend mauris sem
                            </p>
                            <Link href="service-single.html" className="btn-text">
                                Read More
                                <i className="ti-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    <div className="service-box">
                        <img
                            src="/assets/img/shape/shape-service.png"
                            alt="no image"
                            className="service-shape"
                        />
                        <div className="service-icon">
                            <i className="custom-icon">
                                <img src="/assets/img/icon/service-trans-2.png" alt="no image" />
                            </i>
                        </div>
                        <div className="service-desc">
                            <h4 className="heading-4">Business Plan</h4>
                            <p>
                                Curabitur blandit mi liberonec consequat nulla rutrum inonec
                                eleifend mauris sem
                            </p>
                            <Link href="service-single.html" className="btn-text">
                                Read More
                                <i className="ti-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    <div className="service-box">
                        <img
                            src="/assets/img/shape/shape-service.png"
                            alt="no image"
                            className="service-shape"
                        />
                        <div className="service-icon">
                            <i className="custom-icon">
                                <img src="/assets/img/icon/service-trans-3.png" alt="no image" />
                            </i>
                        </div>
                        <div className="service-desc">
                            <h4 className="heading-4">Business Security</h4>
                            <p>
                                Curabitur blandit mi liberonec consequat nulla rutrum inonec
                                eleifend mauris sem
                            </p>
                            <Link href="service-single.html" className="btn-text">
                                Read More
                                <i className="ti-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    <div className="service-box">
                        <img
                            src="/assets/img/shape/shape-service.png"
                            alt="no image"
                            className="service-shape"
                        />
                        <div className="service-icon">
                            <i className="custom-icon">
                                <img src="/assets/img/icon/service-trans-4.png" alt="no image" />
                            </i>
                        </div>
                        <div className="service-desc">
                            <h4 className="heading-4">Data Server</h4>
                            <p>
                                Curabitur blandit mi liberonec consequat nulla rutrum inonec
                                eleifend mauris sem
                            </p>
                            <Link href="service-single.html" className="btn-text">
                                Read More
                                <i className="ti-arrow-right" />
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default services