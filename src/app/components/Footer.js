import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="footer pos-rel overflow-hidden">
            <img src="/assets/img/bg/bg-map.png" className="bg-map" alt="no image" />
            <div className="footer-up de-padding">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="footer-widget about-us">
                                <div className="footer-logo mb-30">
                                    <img src="https://2sglobal.co/images/logo.png" alt="no image" />
                                </div>
                                <p>
                                    Lorem ipsum dolor sit consectetur adipiscing elit, sed do eiusmod
                                    incididunt ut labore et dolore
                                </p>
                                <ul className="footer-social">
                                    <li>
                                        <Link href="#">
                                            <i className="fab fa-facebook-f" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <i className="fab fa-instagram" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <i className="fab fa-twitter" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <i className="fab fa-youtube" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <div className="footer-widget footer-recent-post">
                                <h4 className="footer-widget-title">
                                    Recent Posts
                                    <span className="footer-title-line" />
                                </h4>
                                <div className="recent-post-wrp">
                                    <div className="footer-recent-post-single">
                                        <div className="recent-post-pic">
                                            <img src="/assets/img/pictures/post-1.png" alt="no image" />
                                        </div>
                                        <div className="recent-post-desc">
                                            <span className="recent-post-date">17 April 2023</span>
                                            <h5 className="heading-5">
                                                Master of backyard <br /> tiling rest
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="footer-recent-post-single">
                                        <div className="recent-post-pic">
                                            <img src="/assets/img/pictures/post-2.png" alt="no image" />
                                        </div>
                                        <div className="recent-post-desc">
                                            <span className="recent-post-date">18 April 2023</span>
                                            <h5 className="heading-5">
                                                The rest of us avoid <br /> common sort
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="footer-recent-post-single">
                                        <div className="recent-post-pic">
                                            <img src="/assets/img/pictures/post-3.png" alt="no image" />
                                        </div>
                                        <div className="recent-post-desc">
                                            <span className="recent-post-date">18 April 2023</span>
                                            <h5 className="heading-5">
                                                Finding hidden gems <br /> of this sort
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-6 col-md-6">
                            <div className="footer-widget footer-link">
                                <h4 className="footer-widget-title">
                                    It Services
                                    <span className="footer-title-line" />
                                </h4>
                                <ul className="footer-list">
                                    <li>
                                        <Link href="/aboutus">
                                            <i className="ti-angle-right" />
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service">
                                            <i className="ti-angle-right" />
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/team">
                                            <i className="ti-angle-right" />
                                            Team
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/project">
                                            <i className="ti-angle-right" />
                                            Product
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <i className="ti-angle-right" />
                                            Faq
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">
                                            <i className="ti-angle-right" />
                                            Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/casestudies">
                                            <i className="ti-angle-right" />
                                            Case Studies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <i className="ti-angle-right" />
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacypolicy">
                                            <i className="ti-angle-right" />
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/termscondition">
                                            <i className="ti-angle-right" />
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="footer-widget footer-subs">
                                <h4 className="footer-widget-title">
                                    Subscribe
                                    <span className="footer-title-line" />
                                </h4>
                                <div className="subscribe-area">
                                    <p className="mb-20">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                    </p>
                                    <div className="about-btn-content">
                                        <div className="about-call">
                                            <div className="about-call-icon">
                                                <i>
                                                    <img src="/assets/img/icon/telephone.png" alt="no image" />
                                                </i>
                                            </div>
                                            <div className="about-call-text">
                                                <span>Call for help</span>
                                                <h5 className="mb-0">+123-4567-8900</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <form>
                                        <span className="btn-shape" />
                                        <input
                                            type="text"
                                            className="input-style-4"
                                            placeholder="Enter Email..."
                                        />
                                        <button type="submit" className="btn-subs">
                                            <i className="ti-angle-right" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="copyright-element text-center">
                        <p className="mb-0">
                            Copyright 2025 2S Global Technologies Limited . All Rights Reserved By 2S Global Technologies Limited
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer