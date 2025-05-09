import React from 'react'
import Link from 'next/link';
import styles from './DummyServiceCard.module.css';

function DummyServiceCard() {




    return (
        <div className="service-area-2 bg de-padding">
            <div className="container">
                <div className="service-wpr-2 service-wpp-0 grid-3">
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            {/* <div className={styles["icon-wrapper"]}>
                                <img src="/country/united-states.png" alt="USA Flag" className={styles["flag-icon"]} />
                            </div> */}
                            <i className="fas fa-flag-usa">
                                <div className={styles["icon-wrapper"]}>
                                    <img src="/country/united-states.png" alt="USA Flag" className={styles["flag-icon"]} />
                                </div>
                                <span />
                            </i>
                            {/* <img src="/country/united-states.png" alt="USA Flag" className="w-2 h-2 object-contain"/> */}
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">USA Address</h4>
                            </Link>
                            <p>
                                971 US Highway 202N STE N<br />
                                Branchburg NJ 08876
                            </p>
                        </div>
                    </div>
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            <i className="flaticon-gadget">
                                <span />
                            </i>
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">UK Address</h4>
                            </Link>
                            <p>
                                27, Old Gloucester Street, London<br />
                                WC1N 3AX, United Kingdom
                            </p>
                        </div>
                    </div>
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            <i className="flaticon-hand-and-trackpad">
                                <span />
                            </i>
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">UAE Address</h4>
                            </Link>
                            <p>
                                Business Centre, Sharjah Publishing City Free Zone, Sharjah, UAE
                            </p>
                        </div>
                    </div>
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            <i className="flaticon-renewable-energy">
                                <span />
                            </i>
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">India Address</h4>
                            </Link>
                            <p>
                                108, Webel IT Park (Phase-II),<br />
                                DH Block, Action Area 1D, New Town,<br />
                                Kolkata-700160
                            </p>
                        </div>
                    </div>
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            <i className="flaticon-nanocrystal">
                                <span />
                            </i>
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">Hongkong Address</h4>
                            </Link>
                            <p>
                                RM 1504, 15/F Kwong Fat Comm Building<br />
                                582-588 Canton Road Yau Ma Tei KLN<br />
                                Hong Kong
                            </p>
                        </div>
                    </div>
                    <div className="service-box-2">
                        <div className="service-icon-2">
                            <i className="flaticon-promotion">
                                <span />
                            </i>
                        </div>
                        <div className="service-desc-2">
                            <Link href="service-single.html">
                                <h4 className="heading-4">Bangladesh Address</h4>
                            </Link>
                            <p>
                                111, Noya Paltan, 6th Floor,<br />
                                Paltan, Dhaka-1000
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default DummyServiceCard