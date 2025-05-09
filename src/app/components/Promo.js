import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

function Promo() {
    return (
        <div className="promo-area bg-overlay video-bg-live de-pt">
            <div
                className="player"
                data-property="{videoURL:'https://youtu.be/cQx8ZYK64dM',containment:'.video-bg-live', showControls:false, autoPlay:true, zoom:0, loop:true, mute:true, startAt:1, opacity:1, quality:'default'}"
            />
            <div className="container">
                <div className="promo-wpr">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8">
                            <div className="promo-left promo-white">
                                <span className="hero-sub-title">Promotional Video</span>
                                <h2 className="heading-1">
                                    Exclusive video presentation <br />
                                    about recent project
                                </h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                                    lacus dolor, semper quis lacinia sed, auctor vel urna. Vestibulum
                                    etin scelerisque purus. Morbi a ornare mauris. Pellentesque
                                </p>
                                <div className="about-btn-content">
                                    <Link href="#" className="btn-1">
                                        Contact Us
                                    </Link>
                                    <div className="about-call">
                                        <div className="about-call-icon">
                                            <i>
                                                <img src="/assets/img/icon/telephone.png" alt="no image" />
                                            </i>
                                        </div>
                                        <div className="about-call-text">
                                            <span>Call for help</span>
                                            <h5 className="mb-0 text-white">+123-4567-8900</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4">
                            <div className="promo-right">
                                <div className="promo-dg">
                                    <span className="d-block mb-10">Digital Engagement</span>
                                    <h5 className="mb-0 text-white">watch history</h5>
                                </div>
                                <div className="pl">
                                    <Link href="#" className="item popup-youtube play-bt">
                                        <i className="fal fa-play" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="promo-opt grid-3 de-pt">
                    <div className="promo-opt-single">
                        <span>01.</span>
                        <h4 className="heading-4">
                            Payroll <br /> Management
                        </h4>
                    </div>
                    <div className="promo-opt-single promo-opt-active">
                        <span>02.</span>
                        <h4 className="heading-4">
                            Employee <br /> Compensation
                        </h4>
                    </div>
                    <div className="promo-opt-single">
                        <span>03.</span>
                        <h4 className="heading-4">
                            Benefits <br /> Management
                        </h4>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Promo