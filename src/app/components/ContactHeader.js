"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
import { loadScript } from "@/lib/loadScript";

function ContactHeader({ colorCode }) {


    const pathname = usePathname();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/assets/js/bsnav.min.js'; // example path
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [pathname]);



    return (
        <header className="header">
            <div className="main-navigation">
                <div className="main-wrapper">
                    <div className="navbar navbar-expand-lg bsnav bsnav-sticky bsnav-sticky-slide bsnav-transparent">
                        <div className="container">
                            <Link className="navbar-brand" href="/">
                                <img
                                    src="https://2sglobal.co/images/logo.png"
                                    className="logo-display"
                                    alt="thumb"
                                />
                                <img
                                    src="https://2sglobal.co/images/logo.png"
                                    className="logo-scrolled"
                                    alt="thumb"
                                />
                            </Link>
                            <button className="navbar-toggler toggler-spring">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse justify-content-md-center">
                                <ul className="navbar-nav navbar-mobile mr-0">
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/" style={{ color: colorCode }}>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/aboutus" style={{ color: colorCode }}>
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/service" style={{ color: colorCode }}>
                                            Services
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/team" style={{ color: colorCode }}>
                                            Team
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/project" style={{ color: colorCode }}>
                                            Product
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/associatecompanies" style={{ color: colorCode }}>
                                            Associate Companies
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" href="/blog" style={{ color: colorCode }}>
                                            Blog
                                        </Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/casestudies" style={{ color: colorCode }}>
                                            Case Studies
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/contact" style={{ color: colorCode }}>
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bsnav-mobile">
                        <div className="bsnav-mobile-overlay" />
                        <div className="navbar">
                            <img
                                src="/assets/img/logo/logo.png"
                                className="logo-scrolled"
                                alt="thumb"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default ContactHeader