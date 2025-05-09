'use client';
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";

function Header() {

    const pathname = usePathname();

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = '/assets/js/bsnav.min.js'; // example path
    //     script.async = true;

    //     document.body.appendChild(script);

    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, [pathname]);

    return (

        <header className="header header-1">
            <div className="main-wrapper">
                <div className="navbar navbar-expand-lg bsnav bsnav-sticky bsnav-sticky-slide bsnav-transparent">
                    <div className="container ">
                        <Link className="navbar-brand" href="index.html" >
                            <Image
                                src="/assets/img/logo/logo-white.png"
                                className="logo-display"
                                alt="thumb"
                            />
                            <Image
                                src="/assets/img/logo/logo.png"
                                className="logo-scrolled"
                                alt="thumb"
                            />
                        </Link>
                        <button className="navbar-toggler toggler-spring">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-md-center">
                            <ul className="navbar-nav navbar-mobile mr-0">
                                <li className="nav-item dropdown fadeup">
                                    <Link className="nav-link" href="#">
                                        Home <i className="ti-angle-down" />
                                    </Link>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="">
                                                Home Version 1
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/nxsnx">
                                                Home Version 2
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/aboutus">
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item dropdown fadeup">
                                    <Link className="nav-link" href="#">
                                        Pages <i className="ti-angle-down" />
                                    </Link>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/service">
                                                Services
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="service-single.html">
                                                Service Single
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/team">
                                                Team
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/project">
                                                Projects
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/projectsingle">
                                                Project Single
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/pricingtable">
                                                Pricing Table
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/faq">
                                                Faq
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/dummy">
                                                404
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown fadeup">
                                    <Link className="nav-link" href="#">
                                        News <i className="ti-angle-down" />
                                    </Link>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/blog">
                                                Blog
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="/blogsingle">
                                                Blog Single
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/contact">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="search-cart nav-profile">
                            <Link href="contact.html" className="btn-1 btn-md">
                                Lets Begin
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bsnav-mobile">
                    <div className="bsnav-mobile-overlay" />
                    <div className="navbar">
                        <img
                            src="assets/img/logo/logo.png"
                            className="logo-scrolled"
                            alt="thumb"
                        />
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header